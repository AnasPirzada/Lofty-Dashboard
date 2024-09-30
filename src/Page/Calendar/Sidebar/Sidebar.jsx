// src/components/Sidebar.js
import React, { useState } from 'react';

const sidebarItems = [
  {
    title: 'My Tasks',
    subItems: [
      'All Tasks',
      'Scheduled',
      'Today',
      'This Week',
      'This Month',
      'Overdue',
      'Finished',
    ],
  },
  // {
  //   title: 'Team Tasks',
  //   subItems: [
  //     'All Tasks',
  //     'Scheduled',
  //     'Today',
  //     'This Week',
  //     'This Month',
  //     'Overdue',
  //     'Finished',
  //   ],
  // },
];

const Sidebar = ({
  myTasksSelectedTab,
  setMyTasksSelectedTab,
  teamTasksSelectedTab,
  setTeamTasksSelectedTab,
  setActiveSection,
  activeSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Toggle Button */}
      <button
        className={`md:hidden fixed top-30 left-4 z-30 p-2 bg-[#9094A5] text-white rounded-lg px-6 focus:outline-none ${
          isOpen ? 'ms-32 mt-4 top-0' : ' left-0'
        } `}
        onClick={toggleSidebar}
      >
        {isOpen ? '←' : '→'}
      </button>

      <div
        // className='w-64 bg-gray-900 text-gray-300 h-screen p-4'
        className={` bg-gray-600 text-gray-300 p-4 z-40 transition-transform duration-300 ${
          isOpen
            ? 'translate-x-0 fixed top-0 left-0 '
            : '-translate-x-full h-0 md:h-full'
        } md:translate-x-0 md:w-100`}
      >
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className='font-bold text-gray-400 uppercase'>
              {section.title}
            </h3>
            <ul className='mt-2 mb-6'>
              {section.subItems.map((item, idx) => {
                // Determine if this is the selected item based on the section
                const isSelected =
                  section.title === 'My Tasks'
                    ? myTasksSelectedTab === item
                    : teamTasksSelectedTab === item;

                return (
                  <li
                    key={idx}
                    onClick={() => {
                      setActiveSection(section.title);
                      if (section.title === 'My Tasks') {
                        setMyTasksSelectedTab(item);
                      } else {
                        setTeamTasksSelectedTab(item);
                      }
                    }}
                    className={`cursor-pointer flex justify-between items-center  mt-1 px-2 py-1 rounded ${
                      isSelected ? 'bg-[#E0E0E0] text-[#9094A5]' : ''
                    }`}
                  >
                    {item}
                    <p className='first'>0</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-30 md:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
