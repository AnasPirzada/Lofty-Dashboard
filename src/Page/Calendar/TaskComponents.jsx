import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Helper function to format dates
const formatDate = date =>
  date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

// API call to fetch tasks
export const fetchTasks = async () => {
  try {
    const response = await fetch(
      'https://api.tkglisting.com/api/dates/calendar'
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('inside fetch', data);

    return data.transactions.flatMap(transaction =>
      transaction.dates.map(date => ({
        transactionId: transaction.transaction_id,
        transactionName: transaction.transaction_name,
        stageId: date.stage_id,
        taskId: date.task.task_id,
        address: `${transaction.address}, ${transaction.city}, ${transaction.state}`,
        taskName: date.task.task_name,
        enteredDate: new Date(date.entered_date),
        taskStatus: date.task.task_status,
      }))
    );
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Function to update task status
const updateTaskStatus = async (
  taskId,
  transactionId,
  stageId,
  setLoadingTaskId,
  setupdatedLoading
) => {
  try {
    setLoadingTaskId(taskId); // Show loader for this task

    const requestBody = {
      transaction_id: transactionId,
      stage_id: stageId,
      task_status: 'Completed',
    };

    const response = await fetch(
      `https://api.tkglisting.com/api/transactions/${taskId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      toast.success('Task status updated successfully!');
      setupdatedLoading(true);
      console.log('Task status updated, triggering refetch'); // Debugging
    } else {
      const errorMessage = await response.text();
      console.error('Failed to update task status:', errorMessage);
      throw new Error(`Failed to update task status: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    toast.error('Error updating task status');
  } finally {
    setLoadingTaskId(null); // Hide loader after update
  }
};

// TaskTable Component
const TaskTable = ({
  tasks,
  showCheckbox = true,
  onTaskStatusChange,
  loadingTaskId,
}) => {
  const handleCheckboxClick = async task => {
    await onTaskStatusChange(task); // Perform the task status update
  };

  return (
    <>
      <ToastContainer />
      <table className='w-full border border-gray-200 rounded-lg'>
        <thead>
          <tr className='border-b text-nowrap'>
            <th className='px-4 py-2 text-left text-gray-600'>Transaction</th>
            <th className='px-4 py-2 text-left text-gray-600'>Address</th>
            <th className='px-4 py-2 text-left text-gray-600'>
              Task Description
            </th>
            <th className='px-4 py-2 text-left text-gray-600'>Task Days</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              className='border-b text-nowrap hover:bg-gray-50 transition duration-150 ease-in-out'
            >
              <td className='px-4 py-3 flex items-center'>
                {showCheckbox && (
                  <>
                    <input
                      type='checkbox'
                      className='mr-2'
                      onChange={() => handleCheckboxClick(task)}
                      disabled={task.taskStatus === 'Completed'}
                      checked={task.taskStatus === 'Completed'}
                    />
                    {loadingTaskId === task.taskId && (
                      <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-gray-600'></div>
                    )}
                  </>
                )}
                <span>{task.transactionName}</span>
              </td>
              <td className='px-4 py-3'>{task.address}</td>
              <td className='px-4 py-3'>{task.taskName}</td>
              <td className='px-4 py-3 text-nowrap'>
                {formatDate(task.enteredDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// Task Category Component
const TaskCategory = ({ filterTasks, showCheckbox }) => {
  const [tasks, setTasks] = useState([]);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [updatedLoading, setupdatedLoading] = useState(false);

  // Fetch and set tasks data
  const fetchData = async () => {
    console.log('Fetching data...'); // Log when fetching data starts
    try {
      const data = await fetchTasks();
      console.log('Raw data:', data); // Log raw data from API
      const filteredTasks = filterTasks(data);
      console.log('Filtered tasks:', filteredTasks); // Log filtered tasks
      setTasks(filteredTasks);
    } finally {
      setupdatedLoading(false); // Reset updatedLoading to false after fetching
    }
  };

  // Effect to re-fetch data when updatedLoading is true
  useEffect(() => {
    if (updatedLoading) {
      console.log('updatedLoading is true, calling fetchData...');
      fetchData();
    }
  }, [updatedLoading]);

  // Fetch data initially on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async task => {
    await updateTaskStatus(
      task.taskId,
      task.transactionId,
      task.stageId,
      setLoadingTaskId,
      setupdatedLoading
    );
  };

  return (
    <TaskTable
      tasks={tasks}
      showCheckbox={showCheckbox}
      onTaskStatusChange={handleStatusChange}
      loadingTaskId={loadingTaskId}
    />
  );
};

// Example TaskCategory Instances
export const ScheduledTasks = () => (
  <TaskCategory filterTasks={data => data} showCheckbox />
);
export const TodayTasks = () => (
  <TaskCategory
    filterTasks={data =>
      data.filter(
        task =>
          task.enteredDate.toDateString() === new Date().toDateString() &&
          task.taskStatus !== 'Completed'
      )
    }
    showCheckbox
  />
);

export const ThisWeekTasks = () => (
  <TaskCategory
    filterTasks={data => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

      return data.filter(
        task =>
          task.enteredDate >= startOfWeek &&
          task.enteredDate <= endOfWeek &&
          task.taskStatus !== 'Completed'
      );
    }}
    showCheckbox
  />
);

export const ThisMonthTasks = () => (
  <TaskCategory
    filterTasks={data => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      return data.filter(
        task =>
          task.enteredDate >= startOfMonth &&
          task.enteredDate <= endOfMonth &&
          task.taskStatus !== 'Completed'
      );
    }}
    showCheckbox
  />
);

export const OverdueTasks = () => (
  <TaskCategory
    filterTasks={data =>
      data.filter(
        task => task.enteredDate < new Date() && task.taskStatus !== 'Completed'
      )
    }
    showCheckbox
  />
);

export const FinishedTasks = () => (
  <TaskCategory
    filterTasks={data => data.filter(task => task.taskStatus === 'Completed')}
    showCheckbox={false}
  />
);

export default {
  FinishedTasks,
  OverdueTasks,
  ScheduledTasks,
  ThisMonthTasks,
  ThisWeekTasks,
  TodayTasks,
  fetchTasks,
};
