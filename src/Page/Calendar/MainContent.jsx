// src/components/MainContent.jsx
import React from 'react';
import AllCalenderTasks from './AllCalenderTasks.jsx';
import {
  FinishedTasks,
  OverdueTasks,
  ScheduledTasks,
  ThisMonthTasks,
  ThisWeekTasks,
  TodayTasks,
} from './TaskComponents';
const MainContent = ({
  myTasksSelectedTab,
  teamTasksSelectedTab,
  activeSection,
}) => {
  const displayTab =
    activeSection === 'My Tasks' ? myTasksSelectedTab : teamTasksSelectedTab;

  const renderContent = () => {
    switch (displayTab) {
      case 'All Tasks':
        return <AllCalenderTasks />;
      case 'Scheduled':
        return <ScheduledTasks />;
      case 'Today':
        return <TodayTasks />;
      case 'This Week':
        return <ThisWeekTasks />;
      case 'This Month':
        return <ThisMonthTasks />;
      case 'Overdue':
        return <OverdueTasks />;
      case 'Finished':
        return <FinishedTasks />;
      default:
        return <h2>Please select a tab from the sidebar</h2>;
    }
  };

  return (
    <div className='bg-[#F3F5F9] h-full overflow-y-auto p-4 md:p-6'>
      <h2 className='text-xl font-medium mb-4'>{displayTab}</h2>
      <div>{renderContent()}</div>
    </div>
  );
};

export default MainContent;
