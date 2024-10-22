import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';

const DateFields = ({ transactionId, createdBy, state, stageId }) => {
  // Statically defined field names
  const staticFields = [
    { name: 'Appointment Date' },
    { name: 'Listing Date' },
    { name: 'Closing Date' },
    { name: 'Contract Signed Date' },
    { name: 'Expiration Date' },
    { name: 'Home Inspection Date' },
    { name: 'Appraisal Date' },
  ];

  const [dateFields, setDateFields] = useState(staticFields); // Initialize with static fields
  const [selectedDates, setSelectedDates] = useState(
    Array(staticFields.length).fill(null)
  );
  const [openPickerIndex, setOpenPickerIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch transaction-specific dates
  const fetchTransactionDates = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(
        `https://api.tkglisting.com/api/dates/${transactionId}`
      );

      if (response.status === 404) {
        console.error(
          'Transaction not found, proceeding with static fields only.'
        );
        return; // Do nothing, just display static fields
      }

      const data = await response.json();

      if (data.dates && Array.isArray(data.dates)) {
        const transactionDates = data.dates.map(item => ({
          name: item.date_name,
          created_date: new Date(item.entered_date),
        }));

        // Replace general dates with transaction-specific dates where the name matches
        const updatedDates = staticFields.map(field => {
          const match = transactionDates.find(
            tDate => tDate.name === field.name
          );
          return match ? { ...field, created_date: match.created_date } : field;
        });

        setDateFields(updatedDates);
      } else {
        console.error('Unexpected data format:', data);
        setErrorMessage('Failed to fetch transaction-specific date fields.');
      }
    } catch (error) {
      console.error('Error fetching transaction-specific date fields:', error);
      setErrorMessage('Error fetching date fields. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch dates when component mounts
  useEffect(() => {
    if (transactionId) {
      fetchTransactionDates();
    }
  }, [transactionId]);

  // Handle date change
  const handleDateChange = (date, index) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
    setOpenPickerIndex(null);
  };

  // Logic to add dates
  const handleAddDates = async () => {
    const datesToAdd = selectedDates
      .map((date, index) => ({
        date_name: dateFields[index]?.name,
        date_value: date ? date.toISOString().split('T')[0] : null,
      }))
      .filter(date => date.date_value);

    const body = {
      created_by: createdBy,
      transaction_id: transactionId,
      state_id: state,
      stage_id: stageId,
      dates: datesToAdd,
    };

    console.log('Request Body:', JSON.stringify(body, null, 2));

    setIsLoading(true);
    try {
      const response = await fetch('https://api.tkglisting.com/api/dates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Dates added successfully:', result);
        toast.success('Dates added successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Refetch dates after adding
        fetchTransactionDates();
      } else {
        const errorResponse = await response.json();
        console.error('Error adding dates:', errorResponse);
        setErrorMessage('Failed to add dates. Please try again later.');
      }
    } catch (error) {
      console.error('Network error while adding dates:', error);
      setErrorMessage('Error adding dates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className='grid grid-cols-12 gap-4'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          dateFields.map((field, index) => (
            <React.Fragment key={index}>
              <div className='col-span-12 md:col-span-3 p-4'>
                <p>{field.name}</p>
              </div>
              <div className='col-span-12 md:col-span-9 p-4'>
                <div className='border rounded-lg p-2 flex items-center relative'>
                  <img
                    src='/calender-svgrepo-com.svg'
                    className='w-4 h-4 cursor-pointer'
                    alt='Calendar Icon'
                    onClick={() => setOpenPickerIndex(index)}
                    style={{ touchAction: 'manipulation' }}
                  />
                  <p className='font-normal text-lg ms-4'>
                    {selectedDates[index]
                      ? selectedDates[index].toLocaleDateString()
                      : field.created_date
                      ? field.created_date.toLocaleDateString()
                      : 'N/A'}
                  </p>
                  {openPickerIndex === index && (
                    <div className='absolute top-full left-0 z-10'>
                      <DatePicker
                        selected={selectedDates[index]}
                        onChange={date => handleDateChange(date, index)}
                        inline
                        calendarClassName='custom-calendar'
                        popperPlacement='bottom'
                      />
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))
        )}
        <div className='col-span-12 text-center mt-4'>
          <button
            onClick={handleAddDates}
            className='btn text-white rounded-lg bg-gray-700 py-3 px-7 my-6 btn-primary'
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Dates'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DateFields;
