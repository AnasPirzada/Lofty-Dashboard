// src/pages/index.jsx
import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import MainContent from './MainContent.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import { fetchTasks } from './TaskComponents.jsx'; // Correctly import as a named import
import TopNav from './TopNav.jsx';
export const index = () => {
  const [myTasksSelectedTab, setMyTasksSelectedTab] = useState('All Tasks');
  const [teamTasksSelectedTab, setTeamTasksSelectedTab] = useState('');
  const [activeSection, setActiveSection] = useState('My Tasks');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTasks(); // Fetch your tasks
      setTasks(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='grid grid-cols-1 lg:grid-cols-12'>
        <div className='col-span-12 lg:col-span-12 w-full rounded-lg'>
          <div className='grid grid-cols-1 md:grid-cols-12'>
            <div className='md:col-span-3 lg:col-span-2'>
              <Sidebar
                myTasksSelectedTab={myTasksSelectedTab}
                setMyTasksSelectedTab={setMyTasksSelectedTab}
                teamTasksSelectedTab={teamTasksSelectedTab}
                setTeamTasksSelectedTab={setTeamTasksSelectedTab}
                setActiveSection={setActiveSection}
                activeSection={activeSection}
                tasks={tasks}
              />
            </div>
            <div className='col-span-9 lg:col-span-10'>
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
