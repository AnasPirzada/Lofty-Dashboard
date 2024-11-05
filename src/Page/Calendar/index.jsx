import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import MainContent from './MainContent.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import { fetchTasks } from './TaskComponents.jsx';
import TopNav from './TopNav.jsx';

const Index = () => {
  const [myTasksSelectedTab, setMyTasksSelectedTab] = useState('All Tasks');
  const [teamTasksSelectedTab, setTeamTasksSelectedTab] = useState('');
  const [activeSection, setActiveSection] = useState('My Tasks');
  const [tasks, setTasks] = useState([]);
  const [updatedLoading, setupdatedLoading] = useState(false);
  const [finishedCount, setFinishedCount] = useState(0);

  const fetchData = async () => {
    const data = await fetchTasks();
    setTasks(data);
    setFinishedCount(
      data.filter(task => task.taskStatus === 'Completed').length
    );
    setupdatedLoading(false);
  };

  useEffect(() => {
    if (updatedLoading) {
      fetchData();
    }
  }, [updatedLoading]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskCompletion = () => {
    setupdatedLoading(true); // Triggers data refetch, which will update finishedCount
  };

  console.log('finishedCount in index', finishedCount);

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
                finishedCount={finishedCount}
              />
            </div>
            <div className='col-span-9 lg:col-span-10'>
              <TopNav />
              <MainContent
                myTasksSelectedTab={myTasksSelectedTab}
                teamTasksSelectedTab={teamTasksSelectedTab}
                activeSection={activeSection}
                setupdatedLoading={handleTaskCompletion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
