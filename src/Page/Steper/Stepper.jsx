import React, { useState } from 'react';
import './Stepper.css';
import AccountingContent from './StepperContent/AccountingContent.jsx';
import ChecklistsContent from './StepperContent/ChecklistsContent';
import ContactsContent from './StepperContent/ContactsContent';
import DatesContent from './StepperContent/DateStepperContent.jsx';
import DocumentsContent from './StepperContent/DocumentsContent';
import HistoryContent from './StepperContent/HistoryContent';
import OffersContent from './StepperContent/OffersContent';
import PropertyContent from './StepperContent/PropertyContent';

const stepName = [
  'Pre-Listing',
  'Active Listing',
  'Under Contract',
  // 'Pending',
  // 'Closed/Cancelled',
];

const Stepper = ({ selectedOption, transactionId, createdBy, state }) => {
  // Track global completion state for all steps
  const [stepsCompletion, setStepsCompletion] = useState(
    stepName.map(() => false) // Initialize all steps as incomplete (false)
  );

  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [nextStep, setNextStep] = useState(null); // Track the step to move to after confirmation

  // Handle progressing to the next step
  const handleNext = () => {
    if (currentStep < stepName.length - 1) {
      setNextStep(currentStep + 1); // Set next step
      setIsModalOpen(true); // Open confirmation modal
    }
  };

  // Handle clicking on a specific step
  const handleStepClick = index => {
    if (index !== currentStep) {
      setNextStep(index); // Set the selected step
      setIsModalOpen(true); // Open confirmation modal
    }
  };

  // Confirm the next step
  const confirmNextStep = () => {
    setIsModalOpen(false); // Close the modal

    // Move to the confirmed step
    setCurrentStep(nextStep);

    // Update global step completion state
    const updatedStepsCompletion = stepsCompletion.map((completed, index) => {
      if (index < nextStep) {
        return true; // Mark all steps up to and including the confirmed step as done
      }
      return completed;
    });
    setStepsCompletion(updatedStepsCompletion); // Save completion status globally
  };

  // Cancel moving to the next step
  const cancelNextStep = () => {
    setIsModalOpen(false); // Close the modal without progressing
    setNextStep(null); // Clear the next step
  };

  // Handle going to the previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  console.log('in steper', transactionId);

  // Render the content based on the selected option
  const renderStepContent = () => {
    switch (selectedOption) {
      case 'Dates':
        return (
          <DatesContent
            currentStep={currentStep}
            createdBy={createdBy}
            state={state}
          />
        );
      case 'Property':
        return <PropertyContent currentStep={currentStep} />;
      case 'Checklists':
        return (
          <ChecklistsContent
            currentStep={currentStep}
            transactionId={transactionId}
            // setTaskCounts={setTaskCounts}
          />
        );
      case 'Accounting':
        return <AccountingContent currentStep={currentStep} />;
      case 'Contacts':
        return <ContactsContent currentStep={currentStep} />;
      case 'Documents':
        return <DocumentsContent currentStep={currentStep} />;
      case 'Offers':
        return <OffersContent currentStep={currentStep} />;
      case 'History':
        return <HistoryContent currentStep={currentStep} />;
      default:
        return <DatesContent currentStep={currentStep} />;
    }
  };

  return (
    <div className='container'>
      {/* Modal for Confirmation */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>Are you sure you want to move to {stepName[nextStep]}?</h3>
            <div className='modal-actions'>
              <button className='modal-btn cancel' onClick={cancelNextStep}>
                Cancel
              </button>
              <button className='modal-btn confirm' onClick={confirmNextStep}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='wrapper flex flex-col md:flex-row border items-center mt-2 bg-[#FFFFFF] py-6 ps-2 ms-2'>
        <div className='arrow-steps  clearfix'>
          {stepName.map((step, index) => (
            <div
              key={index}
              className={`step  ${currentStep === index ? 'current' : ''} ${
                stepsCompletion[index] ? 'done' : ''
              }`} // Apply 'done' class based on global completion state
              onClick={() => handleStepClick(index)} // Open modal for confirmation on click
            >
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className='flex mt-4 md:-mt-3 md:ms-10 justify-center'>
          <div
            className='bg-[#E0E0E0] px-3 py-1 me-4 flex justify-center items-center rounded-lg cursor-pointer'
            onClick={handlePrev}
          >
            <img
              src='/left-arrow-backup-2-svgrepo-com.svg'
              className='w-4'
              alt='Previous'
            />
          </div>
          <div
            className='bg-[#E0E0E0] px-3 py-1 me-4 flex justify-center items-center rounded-lg cursor-pointer'
            onClick={handleNext}
          >
            <img
              src='/right-arrow-backup-2-svgrepo-com.svg'
              className='w-4'
              alt='Next'
            />
          </div>
        </div>
      </div>

      <div className='mt-3 border bg-[#FFFFFF]  h-screen overflow-y-auto ms-2'>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Stepper;
