// src/components/MainContent.jsx
import React from 'react';
import PreListing from './PreListingContent.jsx';
import TodayListing from './TodayListing.jsx';

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
        return <PreListing />;
      case 'Today':
        return <TodayListing />;
      default:
        return <h2>Please select a tab from the sidebar</h2>;
    }
  };

  return (
    <div className="bg-[#F3F5F9] p-4 md:p-6">
      <h2 className="text-xl font-medium mb-4">
        {displayTab} <span className="font-normal ms-5">369</span>
      </h2>
      <div>{renderContent()}</div>
    </div>
  );
};

export default MainContent;