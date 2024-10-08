import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFields = () => {
  const dateFields = [
    { name: 'Expected Close' },
    { name: 'Appointment Date' },
    { name: 'Agreement Signed Date' },
    { name: 'Contract Date' },
    { name: 'Appraisal Date' },
    { name: 'Home Inspection Date' },
    { name: 'Escrow Date' },
    { name: 'Expiration Date' },
    { name: 'Open House' },
    { name: 'Termination Day' },
    { name: 'Day Referred Out' },
    { name: 'Price Reduction' },
    { name: 'Buyer Token' },
    { name: 'Listing Date' },
  ];

  const [selectedDates, setSelectedDates] = useState(
    Array(dateFields.length).fill(null)
  );

  const [openPickerIndex, setOpenPickerIndex] = useState(null);

  const handleDateChange = (date, index) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
    setOpenPickerIndex(null);
  };

  return (
    <div className='grid grid-cols-12 gap-4'>
      {' '}
      {/* Create a 12-column grid layout */}
      {dateFields.map((field, index) => (
        <React.Fragment key={index}>
          <div className='col-span-12 md:col-span-3 p-4'>
            {' '}
            {/* Field Name: 12 on mobile, 3 on larger screens */}
            <p>{field.name}</p>
          </div>
          <div className='col-span-12 md:col-span-9 p-4'>
            {' '}
            {/* Calendar: 12 on mobile, 9 on larger screens */}
            <div className='border rounded-lg p-2 flex items-center relative'>
              <img
                src='/calender-svgrepo-com.svg'
                className='w-4 h-4 cursor-pointer'
                alt='Calendar Icon'
                onClick={() => setOpenPickerIndex(index)}
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
                  />
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DateFields;
