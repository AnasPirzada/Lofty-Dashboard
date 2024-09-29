// StepperContent/ChecklistsContent.js
import { useState } from 'react';
import ActiveListingContent from '../../../Components/ActiveListingContent.jsx';
import ChecklistTemplateModal from '../../../Components/checklistTemplateModal.jsx';
import PreListingContent from '../../../Components/PreListingContent.jsx';
import UnderContractContent from '../../../Components/UnderContractContent.jsx';
const ChecklistsContent = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checklistApplied, setChecklistApplied] = useState(false); // Track if a checklist is applied
  const [selectedChecklistData, setSelectedChecklistData] = useState(null); // Store the selected checklist data
  const tasks = [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      assignedInitials: 'ipsum dolor sit amet',
      assignedName: 'ipsum dolor',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      assignedInitials: 'ipsum dolor sit amet',
      assignedName: 'ipsum dolor',
    },
  ];

  const [activeTab, setActiveTab] = useState('preListing');

  return (
    <div>
      {currentStep === 0 && (
        // <>
        //   <div className='flex justify-end items-center'>
        //     <button className='bg-[#3951BA] py-1 drop-shadow-lg flex mt-4 me-4 text-white px-6 rounded-lg'>
        //       Action{' '}
        //       <img src='/downwhite.svg' className='w-7 h-7 ms-4' alt='' />
        //     </button>
        //   </div>

        //   <div className='flex flex-col mt-40 justify-center items-center'>
        //     <img src='/checklist-svgrepo-com.svg' className='w-7 h-7' alt='' />
        //     <p>No Check list template has been applied</p>
        //   </div>

        //   <div className='grid flex-col mt-10 justify-center items-center grid-cols-12'>
        //     <div className='grid col-span-3'></div>

        //     <div className='grid col-span-6'>
        //       <button className='bg-[#3951BA] text-white py-2 w-full rounded-lg'>
        //         Add an individual Task
        //       </button>
        //     </div>
        //     <div className='grid col-span-3'></div>
        //   </div>

        //   <div className='grid grid-cols-12 mt-4'>
        //     <div className='grid col-span-3'></div>
        //     <div className='grid col-span-6'>
        //       <button
        //         className='bg-[#3951BA] text-white py-2 w-full rounded-lg'
        //         onClick={() => setIsOpen(true)}
        //       >
        //         Apply a checklist Template
        //       </button>
        //     </div>
        //     <div className='grid col-span-3'></div>
        //   </div>
        //   <ChecklistTemplateModal isOpen={isOpen} setIsOpen={setIsOpen} />
        // </>
        <div>
          {/* Conditionally render content based on whether a checklist is applied */}
          {!checklistApplied ? (
            <>
              <div className='flex justify-end items-center'>
                <button className='bg-[#3951BA] py-1 drop-shadow-lg flex mt-4 me-4 text-white px-6 rounded-lg'>
                  Action{' '}
                  <img src='/downwhite.svg' className='w-7 h-7 ms-4' alt='' />
                </button>
              </div>

              <div className='flex flex-col mt-40 justify-center items-center'>
                <img
                  src='/checklist-svgrepo-com.svg'
                  className='w-7 h-7'
                  alt=''
                />
                <p>No Check list template has been applied</p>
              </div>

              <div className='grid flex-col mt-10 justify-center items-center grid-cols-12'>
                <div className='grid col-span-3'></div>
                <div className='grid col-span-6'>
                  <button className='bg-[#3951BA] text-white py-2 w-full rounded-lg'>
                    Add an individual Task
                  </button>
                </div>
                <div className='grid col-span-3'></div>
              </div>

              <div className='grid grid-cols-12 mt-4'>
                <div className='grid col-span-3'></div>
                <div className='grid col-span-6'>
                  <button
                    className='bg-[#3951BA] text-white py-2 w-full rounded-lg'
                    onClick={() => setIsOpen(true)}
                  >
                    Apply a checklist Template
                  </button>
                </div>
                <div className='grid col-span-3'></div>
              </div>

              <ChecklistTemplateModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setChecklistApplied={setChecklistApplied} // Pass state updater to modal
                setSelectedChecklistData={setSelectedChecklistData}
              />
            </>
          ) : (
            <>
              <div className='flex justify-between items-center px-4  border-b'>
                <h2 className='text-lg border-b-2 border-b-[#3951BA] pb-1 font-semibold text-gray-800'>
                  Pre-Listing
                </h2>
                <button className='bg-[#3951BA] py-1 drop-shadow-lg mb-2 flex mt-4 me-4 text-white px-6 rounded-lg'>
                  Action{' '}
                  <img src='/downwhite.svg' className='w-7 h-7 ms-4' alt='' />
                </button>
              </div>
              <div>
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-4 border-b'
                  >
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        className='form-checkbox h-5 w-5 text-[#3951BA]'
                      />
                      <span className='ml-3 text-gray-800'>
                        {task.description}
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div className='bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full'>
                        {task.assignedInitials}
                      </div>
                      <span className='text-gray-600'>{task.assignedName}</span>
                      <img
                        src='/right-arrow-backup-2-svgrepo-com.svg'
                        className='w-4 h-4'
                        alt=''
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <div className='grid grid-cols-12'>
            <div className='grid col-span-6 md:col-span-3 '>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'preListing'
                    ? 'border-b-2 border-[#3951BA] text-[#3951BA]'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('preListing')}
              >
                Pre-Listing
              </button>
            </div>
            <div className='grid col-span-6 md:col-span-3'>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'activeListing'
                    ? 'border-b-2 border-[#3951BA] text-[#3951BA]'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('activeListing')}
              >
                Active Listing
              </button>
            </div>
          </div>

          <div className=' mt-4 flex items-center overflow-x-hidden justify-start ms-5'>
            {/* Tab Content */}
            <div className='w-full'>
              {activeTab === 'preListing' && <PreListingContent />}
              {activeTab === 'activeListing' && <ActiveListingContent />}
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className='grid grid-cols-12'>
            <div className='grid col-span-4 md:col-span-3 '>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'preListing'
                    ? 'border-b-2 border-[#3951BA] text-[#3951BA]'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('preListing')}
              >
                Pre-Listing
              </button>
            </div>
            <div className='grid col-span-4 md:col-span-3'>
              <button
                className={`px-4 py-2 font-semibold text-nowrap ${
                  activeTab === 'activeListing'
                    ? 'border-b-2 border-[#3951BA] text-[#3951BA]'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('activeListing')}
              >
                Active Listing
              </button>
            </div>{' '}
            <div className='grid col-span-4 md:col-span-3'>
              <button
                className={`px-4 py-2 font-semibold text-nowrap ${
                  activeTab === 'UnderContract'
                    ? 'border-b-2 border-[#3951BA]  text-[#3951BA]'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('UnderContract')}
              >
                Under Contract{' '}
              </button>
            </div>
          </div>

          <div className=' mt-4 flex items-center overflow-x-hidden justify-start ms-5'>
            {/* Tab Content */}
            <div className='w-full'>
              {activeTab === 'preListing' && <PreListingContent />}
              {activeTab === 'activeListing' && <ActiveListingContent />}
              {activeTab === 'UnderContract' && <UnderContractContent />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistsContent;
