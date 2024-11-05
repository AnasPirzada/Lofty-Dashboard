import React, { useState } from 'react';

const sidebarItems = [
  {
    title: 'My Tasks',
    subItems: [
      { name: 'All Tasks', count: 0 },
      { name: 'Scheduled' },
      { name: 'Today' },
      { name: 'Overdue' },
      { name: 'Finished', count: 0 },
    ],
  },
];

const Sidebar = ({
  myTasksSelectedTab,
  setMyTasksSelectedTab,
  teamTasksSelectedTab,
  setTeamTasksSelectedTab,
  setActiveSection,
  activeSection,
  finishedCount,
  tasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Calculate counts for 'All Tasks' and 'Finished' only
  const counts = {
    alltasks: tasks.length,
    finished: finishedCount,
  };

  return (
    <>
      <button
        className={`md:hidden fixed top-30 left-4 z-30 p-2 bg-gray-700 text-white rounded-lg px-6 focus:outline-none ${
          isOpen ? 'ms-32 mt-4 top-0' : 'left-0'
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? '←' : '→'}
      </button>

      <div
        className={`bg-gray-700 text-gray-300 p-4 z-40 transition-transform duration-300 ${
          isOpen
            ? 'translate-x-0 fixed top-0 left-0 '
            : '-translate-x-full h-0 md:h-full'
        } md:translate-x-0 md:w-100`}
      >
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className='font-bold text-white uppercase'>{section.title}</h3>
            <ul className='mt-2 mb-6'>
              {section.subItems.map((item, idx) => {
                const isSelected =
                  section.title === 'My Tasks'
                    ? myTasksSelectedTab === item.name
                    : teamTasksSelectedTab === item.name;

                // Show count only for 'All Tasks' and 'Finished'
                const count =
                  item.name === 'All Tasks' || item.name === 'Finished'
                    ? counts[item.name.toLowerCase().replace(/ /g, '')] || 0
                    : null;

                return (
                  <li
                    key={idx}
                    onClick={() => {
                      setActiveSection(section.title);
                      if (section.title === 'My Tasks') {
                        setMyTasksSelectedTab(item.name);
                      } else {
                        setTeamTasksSelectedTab(item.name);
                      }
                    }}
                    className={`cursor-pointer flex justify-between items-center mt-1 px-2 py-1 rounded ${
                      isSelected ? 'bg-[#E0E0E0] text-[#9094A5]' : ''
                    }`}
                  >
                    {item.name}
                    {count !== null && (
                      <span className='text-gray-400'>{count}</span>
                    )}
                  </li>
                );
              })}

              {/* Display 'This Week' and 'This Month' without counts */}
              <li
                className={`cursor-pointer flex justify-between items-center mt-1 px-2 py-1 rounded ${
                  myTasksSelectedTab === 'This Week'
                    ? 'bg-[#E0E0E0] text-[#9094A5]'
                    : ''
                }`}
                onClick={() => {
                  setActiveSection(section.title);
                  setMyTasksSelectedTab('This Week');
                }}
              >
                This Week
              </li>
              <li
                className={`cursor-pointer flex justify-between items-center mt-1 px-2 py-1 rounded ${
                  myTasksSelectedTab === 'This Month'
                    ? 'bg-[#E0E0E0] text-[#9094A5]'
                    : ''
                }`}
                onClick={() => {
                  setActiveSection(section.title);
                  setMyTasksSelectedTab('This Month');
                }}
              >
                This Month
              </li>
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
