import React, { useState } from 'react';

const sidebarItems = [
  {
    title: 'My Tasks',
    subItems: [
      { name: 'All Tasks', count: 0 },
      { name: 'Scheduled', count: 0 },
      { name: 'Today', count: 0 },
      { name: 'This Week', count: 0 },
      { name: 'This Month', count: 0 },
      { name: 'Overdue', count: 0 },
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
  tasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Calculate counts for each task category
  const counts = {
    allTasks: tasks.length,
    scheduled: tasks.filter(task => task.taskStatus === 'Scheduled').length,
    today: tasks.filter(task => {
      const taskDate = new Date(task.enteredDate);
      return taskDate.toDateString() === new Date().toDateString();
    }).length,
    thisWeek: tasks.filter(task => {
      const taskDate = new Date(task.enteredDate);
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(
        now.setDate(now.getDate() + (6 - now.getDay()))
      );
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    }).length,
    thisMonth: tasks.filter(task => {
      const taskDate = new Date(task.enteredDate);
      const now = new Date();
      return (
        taskDate.getMonth() === now.getMonth() &&
        taskDate.getFullYear() === now.getFullYear()
      );
    }).length,
    overdue: tasks.filter(task => {
      const taskDate = new Date(task.enteredDate);
      return taskDate < new Date() && task.taskStatus !== 'Completed';
    }).length,
    finished: tasks.filter(task => task.taskStatus === 'Completed').length,
  };

  // Log counts for debugging
  console.log('Counts:', counts); // Ensure these are showing correct values

  return (
    <>
      <button
        className={`md:hidden fixed top-30 left-4 z-30 p-2 bg-gray-700 text-white rounded-lg px-6 focus:outline-none ${
          isOpen ? 'ms-32 mt-4 top-0' : ' left-0'
        } `}
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

                // Get the count for the current item
                const count =
                  counts[item.name.toLowerCase().replace(/ /g, '')] || 0;

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
                    <span className='text-gray-400'>{count}</span>{' '}
                    {/* Displaying the count here */}
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
