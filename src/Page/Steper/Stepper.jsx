import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Stepper.css';
import AccountingContent from './StepperContent/AccountingContent.jsx';
import ChecklistsContent from './StepperContent/ChecklistsContent';
import ContactsContent from './StepperContent/ContactsContent';
import DatesContent from './StepperContent/DateStepperContent.jsx';
import DocumentsContent from './StepperContent/DocumentsContent';
import HistoryContent from './StepperContent/HistoryContent';
import OffersContent from './StepperContent/OffersContent';
import PropertyContent from './StepperContent/PropertyContent';

const Stepper = ({
  selectedOption,
  transactionId,
  createdBy,
  state,
  price,
  fullAddress,
  setSelectedOption,
  currentSteps,
  currentSte,
  transactionsId,
}) => {
  const [steps, setSteps] = useState([]); // Store steps from API
  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [nextStep, setNextStep] = useState(null); // Track the step to move to after confirmation
  const [stepsCompletion, setStepsCompletion] = useState([]); // Track completion state
  const [loading, setLoading] = useState(true); // Track loading state

  console.log(transactionsId);

  // // Fetch stages from API
  useEffect(() => {
    const fetchStages = async () => {
      try {
        // Fetch the stages from the transactions API
        const stagesResponse = await fetch(
          'https://api.tkglisting.com/api/transactions/stages'
        );
        const stagesData = await stagesResponse.json();
        console.log('stages', stagesData);

        const fetchedSteps = stagesData.map(stage => stage.stage_name); // Get step names
        const fetchedStepsid = stagesData.map(stage => stage.stage_id); // Get step names

        console.log('fetchedStepsid', fetchedStepsid);

        // Fetch the dates API to compare stages
        const datesResponse = await fetch(
          `https://api.tkglisting.com/api/dates/${transactionsId}`
        );
        const datesData = await datesResponse.json();

        let dateStages = [];
        if (datesData.stages && datesData.stages.length > 0) {
          // Extract stage names or IDs from the dates API response if present
          dateStages = datesData.stages.map(stage => stage.stage_name);
        }

        // Determine the steps to show
        let stepsToDisplay = [];
        let completionStatus = [];

        if (dateStages.length > 0) {
          // Use the stages from the `dates` API, marking as active if present
          stepsToDisplay = fetchedSteps;
          completionStatus = fetchedSteps.map(step =>
            dateStages.includes(step)
          );
        } else {
          // Use all stages fetched from `stages` API if no stage names found in `dates` API, mark as inactive
          stepsToDisplay = fetchedSteps;
          completionStatus = fetchedSteps.map(() => false); // Initially mark all as inactive
        }

        setSteps(stepsToDisplay); // Set steps from API
        setStepsCompletion(completionStatus); // Set initial completion state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stages or dates:', error);
      }
    };

    fetchStages();
  }, [transactionsId]);
  // Handle progressing to the next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  // Handle going to the previous step (with confirmation)
  const handlePrev = () => {
    if (currentStep > 0) {
      setNextStep(currentStep - 1); // Set the previous step as the next step
      setIsModalOpen(true); // Open the confirmation modal
    }
  };

  // Confirm the next step (whether forward or backward)
  const confirmNextStep = async () => {
    // Log initial values for debugging
    console.log('Initial values (inside function):', {
      currentSte,
      transactionsId,
      transactionId,
    });

    // Get valid transaction key
    const transactionKey = transactionId
      ? transactionId.toString()
      : transactionsId.toString();
    console.log('Transaction Key for URL:', transactionKey);

    // Parse `currentSte` as integer
    const currentStage = parseInt(currentSte, 10);
    console.log('Current stage:', currentStage);

    // Check and set `nextStep` relative to `currentStage`
    let new_stage;
    if (nextStep === currentStage) {
      new_stage = currentStage + 1; // If `nextStep` hasn't changed, move forward
    } else if (nextStep > currentStage) {
      new_stage = Math.min(currentStage + 1, 3); // Forward
    } else {
      new_stage = Math.max(currentStage - 1, 1); // Backward
    }

    console.log('New stage:', new_stage);

    if (new_stage < 1 || new_stage > 3) {
      toast.error('Invalid stage. Please check the steps and try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    console.log('API Request Data:', {
      transaction_id: transactionKey,
      current_stage: currentStage,
      new_stage: new_stage,
    });

    try {
      if (!transactionKey) {
        throw new Error('Invalid transaction key.');
      }

      const response = await fetch(
        `https://api.tkglisting.com/api/transactions/${transactionKey}/stage`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_stage: currentStage,
            new_stage: new_stage,
          }),
        }
      );

      const result = await response.json();
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error during API call:', error);
    }

    setIsModalOpen(false);

    setCurrentStep(new_stage - 1); // Zero-based step index

    const updatedStepsCompletion = stepsCompletion.map((completed, index) => {
      return index < new_stage - 1;
    });
    setStepsCompletion(updatedStepsCompletion);
    setSelectedOption('Dates');
  };

  // Cancel moving to the next step
  const cancelNextStep = () => {
    setIsModalOpen(false); // Close the modal without progressing
    setNextStep(null); // Clear the next step
  };

  // Render the content based on the selected option
  const renderStepContent = () => {
    const stageId = currentStep + 1; // Assuming stage IDs are 1-based

    switch (selectedOption) {
      case 'Dates':
        return (
          <DatesContent
            currentStep={currentStep}
            createdBy={createdBy}
            state={state}
            transactionId={transactionId || transactionsId}
            stageId={stageId} // Pass the stage_id to DatesContent
          />
        );
      case 'Property':
        return (
          <PropertyContent
            currentStep={currentStep}
            fullAddress={fullAddress}
            price={price}
          />
        );
      case 'Checklists':
        return (
          <ChecklistsContent
            currentStep={currentStep}
            transactionId={transactionId || transactionsId}
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

  if (loading) {
    return (
      <div>
        <div className='fixed inset-0 bg-gray-200 bg-opacity-60 flex justify-center items-center'>
          <div className='w-8 h-8 border-t-4 border-gray-200 border-solid rounded-full animate-spin'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <ToastContainer />

      {/* Modal for Confirmation */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>Are you sure you want to move to {steps[nextStep]}?</h3>
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
          {steps.map((step, index) => (
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

      <div className='mt-3 border bg-[#FFFFFF] h-screen overflow-y-auto ms-2'>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Stepper;
