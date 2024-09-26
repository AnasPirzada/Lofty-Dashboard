import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import MainContent from './MainContent.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import TopNav from './TopNav.jsx';

export const index = () => {
  const [myTasksSelectedTab, setMyTasksSelectedTab] = useState('All Tasks');
  const [teamTasksSelectedTab, setTeamTasksSelectedTab] = useState('');
  const [activeSection, setActiveSection] = useState('My Tasks');

  return (
    <div>
      <NavBar />
      <div className='grid grid-cols-1 md:grid-cols-12'>
        <div className='col-span-12 lg:col-span-12 w-full rounded-lg '>
          <div className='flex flex-col md:flex-row'>
            <Sidebar
              myTasksSelectedTab={myTasksSelectedTab}
              setMyTasksSelectedTab={setMyTasksSelectedTab}
              teamTasksSelectedTab={teamTasksSelectedTab}
              setTeamTasksSelectedTab={setTeamTasksSelectedTab}
              setActiveSection={setActiveSection}
              activeSection={activeSection}
            />
            <div className='flex-1 flex flex-col md:ml-0 ml-0'>
              <TopNav />
              <MainContent
                myTasksSelectedTab={myTasksSelectedTab}
                teamTasksSelectedTab={teamTasksSelectedTab}
                activeSection={activeSection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
