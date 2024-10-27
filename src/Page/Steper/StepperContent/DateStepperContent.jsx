import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';

const DateFields = ({
  transactionId,
  createdBy,
  state,
  stageId,
  currentStep,
}) => {
  const stageNames = ['Pre-Listing', 'Active Listing', 'Under Contract'];

  const [dateFields, setDateFields] = useState([]); // Static date fields with name and ID
  const [transactionDates, setTransactionDates] = useState([]); // Dynamic date values for transaction-specific data
  const [selectedDatesByStage, setSelectedDatesByStage] = useState({});
  const [openPickerIndex, setOpenPickerIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all date fields from API (to display date names and structure)
  const fetchAllDateFields = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(
        'https://api.tkglisting.com/api/transactions/dates'
      );
      if (!response.ok) throw new Error('Failed to fetch dates from API');

      const data = await response.json();
      setDateFields(data); // Set static fields with names, etc.
    } catch (error) {
      console.error('Error fetching date fields:', error);
      setErrorMessage('Failed to fetch dates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDateFields();
  }, []);

  // Fetch transaction-specific dates for updating entered_date and date_value
  const fetchTransactionDates = async () => {
    if (!transactionId) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(
        `https://api.tkglisting.com/api/dates/${transactionId}`
      );
      if (!response.ok) throw new Error('Transaction not found.');

      const data = await response.json();
      console.log(data);

      const stageData = data.stages.find(stage => stage.stage_id === stageId);
      console.log(stageData);

      if (stageData && stageData.dates) {
        const transactionDates = stageData.dates.map(item => ({
          date_name: item.date_name,
          entered_date: item.entered_date ? new Date(item.entered_date) : null,
        }));
        setTransactionDates(transactionDates); // Only updates transaction-specific dates
      }
    } catch (error) {
      console.error('Error fetching transaction-specific date fields:', error);
      setErrorMessage('Failed to fetch dates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionDates();
  }, [transactionId, stageId]);

  const handleDateChange = (date, index) => {
    const updatedDatesForStage = [...(selectedDatesByStage[stageId] || [])];
    updatedDatesForStage[index] = date;
    setSelectedDatesByStage(prev => ({
      ...prev,
      [stageId]: updatedDatesForStage,
    }));
    setOpenPickerIndex(null);
  };

  const handleAddDates = async () => {
    const selectedDates = selectedDatesByStage[stageId] || [];
    const datesToAdd = selectedDates
      .map((date, index) => ({
        date_id: dateFields[index]?.date_id,
        date_name: dateFields[index]?.date_name,
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

    setIsLoading(true);
    try {
      const response = await fetch('https://api.tkglisting.com/api/dates/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success('Dates added or updated successfully.', {
          position: 'top-right',
          autoClose: 3000,
        });
        await fetchTransactionDates();
        await fetchAllDateFields();
        // fetchTransactionDates(); // Refresh to see updated dates
      } else {
        setErrorMessage('Failed to add dates. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Error adding dates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = stepIndex => {
    const selectedDates = selectedDatesByStage[stageId] || [];

    return (
      <div className='grid grid-cols-12 gap-4'>
        <h2 className='col-span-12 text-xl font-bold mb-4'>
          {stageNames[stepIndex] || 'Stage Information'}
        </h2>
        {isLoading ? (
          <div className='fixed inset-0 bg-gray-200 bg-opacity-60 flex justify-center items-center'>
            <div className='w-8 h-8 border-t-4 border-gray-200 border-solid rounded-full animate-spin'></div>
          </div>
        ) : (
          dateFields.map((field, index) => {
            const transactionDate = transactionDates.find(
              tDate => tDate.date_name === field.date_name
            );
            return (
              <React.Fragment key={index}>
                <div className='col-span-12 md:col-span-3 p-4'>
                  <p>{field.date_name}</p>
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
                        : transactionDate?.entered_date
                        ? transactionDate.entered_date.toLocaleDateString()
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
            );
          })
        )}
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className='container mx-auto p-4'>
        {renderStep(currentStep)}
        <div className='flex justify-end'>
          <button
            onClick={handleAddDates}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4'
            disabled={isLoading}
          >
            {isLoading ? 'Adding Dates...' : 'Add Dates'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DateFields;
