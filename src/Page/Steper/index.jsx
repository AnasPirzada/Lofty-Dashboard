import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import SideSection from './SideSection.jsx';
import Stepper from './Stepper.jsx';

export const Index = () => {
  const [selectedOption, setSelectedOption] = useState('Dates'); // Default to 'Dates'
  const location = useLocation();
  const { transactionId, createdBy, state } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0); // Track the current step here

  return (
    <div>
      <NavBar />
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
        <div className='md:col-span-3'>
          {/* Pass the current step to the SideSection */}
          <SideSection
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            currentStep={currentStep} // Pass currentStep to conditionally apply active style
          />
        </div>
        <div className='md:col-span-9'>
          {/* Pass down the setCurrentStep and setSelectedOption */}
          <Stepper
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption} // Pass this to Stepper
            transactionId={transactionId}
            createdBy={createdBy}
            state={state}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep} // Track and update step changes
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
