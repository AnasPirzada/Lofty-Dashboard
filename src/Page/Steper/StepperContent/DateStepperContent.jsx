import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';

const DateFields = ({ transactionId, createdBy, state, stageId }) => {
  const [dateFields, setDateFields] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [openPickerIndex, setOpenPickerIndex] = useState(null);
  console.log(transactionId);

  // Fetch the date fields from the API
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          'https://api.tkglisting.com/api/transactions/dates'
        );
        const data = await response.json();

        const filteredDates = data.map(dateField => ({
          name: dateField.date_name,
          created_date: new Date(dateField.created_date),
        }));

        setDateFields(filteredDates);
        setSelectedDates(Array(filteredDates.length).fill(null));
      } catch (error) {
        console.error('Error fetching date fields:', error);
      }
    };

    fetchDates();
  }, []);

  // Handle date change
  const handleDateChange = (date, index) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
    setOpenPickerIndex(null);
  };

  // Function to handle API call to add dates
  const handleAddDates = async () => {
    const datesToAdd = selectedDates
      .map((date, index) => ({
        date_name: dateFields[index]?.name,
        date_value: date ? date.toISOString().split('T')[0] : null,
      }))
      .filter(date => date.date_value); // Filter out invalid dates

    const body = {
      created_by: createdBy, // Existing variable
      transaction_id: transactionId, // Add this variable
      state_id: 'IL', // Add this variable
      stage_id: stageId, // Example value, can be dynamic based on your logic
      dates: datesToAdd,
    };

    console.log('Request Body:', JSON.stringify(body, null, 2));

    try {
      const response = await fetch('https://api.tkglisting.com/api/dates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(response);

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
      } else {
        const errorResponse = await response.json();
        console.error(
          'Error adding dates:',
          response.statusText,
          errorResponse
        );
      }
    } catch (error) {
      console.error('Network error while adding dates:', error);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className='grid grid-cols-12 gap-4'>
        {dateFields.map((field, index) => (
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
                  style={{ touchAction: 'manipulation' }} // Touch action for mobile
                />
                <p className='font-normal text-lg ms-4'>
                  {selectedDates[index]
                    ? selectedDates[index].toLocaleDateString()
                    : 'N/A'}
                </p>
                {openPickerIndex === index && (
                  <div className='absolute top-full left-0 z-10'>
                    <DatePicker
                      selected={selectedDates[index]}
                      onChange={date => handleDateChange(date, index)}
                      inline
                      calendarClassName='custom-calendar' // Optional custom styling
                      popperPlacement='bottom' // Positioning the calendar
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: '0, 10',
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
        <div className='col-span-12 text-center mt-4'>
          <button
            onClick={handleAddDates}
            className='btn  text-white rounded-lg bg-blue-500 py-3 px-7 my-6  btn-primary'
          >
            Add Dates
          </button>
        </div>
      </div>
    </>
  );
};

export default DateFields;
