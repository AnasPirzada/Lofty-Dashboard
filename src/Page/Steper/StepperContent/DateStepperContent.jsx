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
  const staticFields = [
    { name: 'Appointment Date' },
    { name: 'Listing Date' },
    { name: 'Closing Date' },
    { name: 'Contract Signed Date' },
    { name: 'Expiration Date' },
    { name: 'Home Inspection Date' },
    { name: 'Appraisal Date' },
  ];

  const stageNames = ['Pre-Listing', 'Active Listing', 'Under Contract'];
  const relevantFields = [
    [0, 1, 2, 3, 4, 5, 6], // Pre-Listing relevant fields
    [0, 1, 2, 3, 4, 5, 6], // Active Listing relevant fields
    [0, 1, 2, 3, 4, 5, 6], // Under Contract relevant fields
  ];

  const [dateFields, setDateFields] = useState(staticFields);
  const [selectedDatesByStage, setSelectedDatesByStage] = useState({});
  const [openPickerIndex, setOpenPickerIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch transaction-specific dates for the current stage
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
        return;
      }

      const data = await response.json();
      console.log('data', data);

      if (data.stages && Array.isArray(data.stages)) {
        // Find the stage data matching the current stageId
        const stageData = data.stages.find(stage => stage.stage_id === stageId);

        if (stageData && stageData.dates) {
          // Map the transaction dates for the current stage
          const transactionDates = stageData.dates.map(item => ({
            name: item.date_name,
            entered_date: item.entered_date
              ? new Date(item.entered_date)
              : null,
          }));

          const updatedDates = staticFields.map(field => {
            const match = transactionDates.find(
              tDate => tDate.name === field.name
            );
            return match
              ? { ...field, entered_date: match.entered_date }
              : { ...field, entered_date: null };
          });

          // Update selectedDatesByStage only for the current stageId
          setSelectedDatesByStage(prev => ({
            ...prev,
            [stageId]: updatedDates.map(field => field.entered_date || null),
          }));

          setDateFields(updatedDates);
        } else {
          console.error('No matching stage data found for this stageId.');
        }
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching transaction-specific date fields:', error);
      setErrorMessage('Failed to fetch dates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch dates when component mounts or stageId changes
  useEffect(() => {
    if (transactionId) {
      fetchTransactionDates();
    }
  }, [transactionId, stageId]);

  // Handle date change
  const handleDateChange = (date, index) => {
    const updatedDatesForStage = [...(selectedDatesByStage[stageId] || [])];
    updatedDatesForStage[index] = date;
    setSelectedDatesByStage(prev => ({
      ...prev,
      [stageId]: updatedDatesForStage,
    }));
    setOpenPickerIndex(null);
  };

  // Add dates logic
  const handleAddDates = async () => {
    const selectedDates = selectedDatesByStage[stageId] || [];

    const datesToAdd = selectedDates
      .map((date, index) => ({
        date_name: dateFields[index]?.name,
        date_value: date ? date.toISOString().split('T')[0] : null,
      }))
      .filter(date => date.date_value); // Only add dates that have a value

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

        fetchTransactionDates(); // Refetch dates after adding
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

  // Render date fields for the current step
  const renderStep = stepIndex => {
    const fieldsToDisplay = relevantFields[stepIndex];
    const selectedDates = selectedDatesByStage[stageId] || [];

    return (
      <div className='grid grid-cols-12 gap-4'>
        <h2 className='col-span-12 text-xl font-bold mb-4'>
          {stageNames[stepIndex] || 'Stage Information'}
        </h2>
        {isLoading ? (
          <p>
            <div className='fixed inset-0 bg-gray-200 bg-opacity-60 flex justify-center items-center'>
              <div className='w-8 h-8 border-t-4 border-gray-200 border-solid rounded-full animate-spin'></div>
            </div>
          </p>
        ) : (
          fieldsToDisplay.map(fieldIndex => {
            const field = dateFields[fieldIndex];
            return (
              <React.Fragment key={fieldIndex}>
                <div className='col-span-12 md:col-span-3 p-4'>
                  <p>{field.name}</p>
                </div>
                <div className='col-span-12 md:col-span-9 p-4'>
                  <div className='border rounded-lg p-2 flex items-center relative'>
                    <img
                      src='/calender-svgrepo-com.svg'
                      className='w-4 h-4 cursor-pointer'
                      alt='Calendar Icon'
                      onClick={() => setOpenPickerIndex(fieldIndex)}
                      style={{ touchAction: 'manipulation' }}
                    />
                    <p className='font-normal text-lg ms-4'>
                      {selectedDates[fieldIndex]
                        ? selectedDates[fieldIndex].toLocaleDateString()
                        : field.entered_date
                        ? field.entered_date.toLocaleDateString()
                        : 'N/A'}
                    </p>
                    {openPickerIndex === fieldIndex && (
                      <div className='absolute top-full left-0 z-10'>
                        <DatePicker
                          selected={selectedDates[fieldIndex]}
                          onChange={date => handleDateChange(date, fieldIndex)}
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
