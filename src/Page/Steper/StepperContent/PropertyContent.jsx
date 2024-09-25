// StepperContent/PropertyContent.js
import React from 'react';

const PropertyContent = ({ currentStep }) => {
  return (
    <div>
      {currentStep === 0 && (
        <div className=''>
          {/* Header Section */}
          <div className='flex justify-between border border-b items-center'>
            <h2 className='text-lg font-semibold ps-5 py-5 text-gray-800'>
              Property
            </h2>
            <button className='first  pe-5 py-5 flex items-center space-x-1'>
              <img src='/edit-3-svgrepo-com.svg' className='w-5 h-5' alt='' />
              <span>Edit</span>
            </button>
          </div>

          {/* Details Section */}
          <div className='space-y-2'>
            <div className='flex justify-start border ps-5 py-5'>
              <span className='text-gray-600 w-40'>Address</span>
              <span className='text-gray-800  font-semibold'>
                123 Main St, Cambridge, MA 02142
              </span>
            </div>
            <div className='flex justify-start border ps-5 py-5'>
              <span className='text-gray-600 w-40'>Unit</span>
              <span className='text-gray-800  font-semibold'>N/A</span>
            </div>
            <div className='flex justify-start border ps-5 py-5'>
              <span className='text-gray-600 w-40'>List Price</span>
              <span className='text-gray-800  font-semibold'>$0</span>
            </div>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className='property-step-2'>
          <h2>Step 2: Upload Documents</h2>
          <button>Upload File</button>
        </div>
      )}

      {currentStep === 2 && (
        <div className='property-step-3'>
          <h2>Step 3: Review Information</h2>
          <button className='save-btn'>Save Property Details</button>
        </div>
      )}
    </div>
  );
};

export default PropertyContent;
