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
    console.log('Fetched Data:', data); // Log the entire fetched data

    return data.transactions.flatMap(transaction =>
      transaction.dates.map(date => ({
        transactionId: transaction.transaction_id,
        transactionName: transaction.transaction_name,
        stageId: date.stage_id, // Ensure stage_id is included
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
// Function to update task status
const updateTaskStatus = async (
  taskId,
  transactionId,
  stageId,
  refreshTasks
) => {
  try {
    console.log('stageId', stageId);
    const requestBody = {
      transaction_id: transactionId,
      stage_id: stageId, // Ensure stageId is included
      task_status: 'Completed',
    };

    // Log the IDs being used for debugging
    console.log('Updating Task with:', {
      taskId,
      transactionId,
      stageId,
      requestBody,
    });

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
      const result = await response.json();
      console.log('Response:', result);
      toast.success('Task status updated successfully!');
      refreshTasks(); // Refresh tasks after update
    } else {
      const errorMessage = await response.text(); // Get error message from response
      console.error('Failed to update task status:', errorMessage);
      throw new Error(`Failed to update task status: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    toast.error('Error updating task status');
  }
};

// TaskTable Component
const TaskTable = ({ tasks, showCheckbox = true, onTaskStatusChange }) => (
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
                <input
                  type='checkbox'
                  className='mr-2'
                  onChange={() => onTaskStatusChange(task)}
                  disabled={task.taskStatus === 'Completed'}
                  checked={task.taskStatus === 'Completed'}
                />
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

// Individual Task Category Components
export const ScheduledTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAndSetTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const handleStatusChange = task => {
    updateTaskStatus(
      task.taskId,
      task.transactionId,
      task.stageId,
      fetchAndSetTasks
    );
  };

  return (
    <TaskTable
      tasks={tasks}
      showCheckbox
      onTaskStatusChange={handleStatusChange}
    />
  );
};

export const TodayTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAndSetTasks = async () => {
    const data = await fetchTasks();
    const today = new Date().toDateString();
    setTasks(
      data.filter(
        task =>
          task.enteredDate.toDateString() === today &&
          task.taskStatus !== 'Completed'
      )
    );
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const handleStatusChange = task => {
    updateTaskStatus(
      task.taskId,
      task.transactionId,
      task.stageId,
      fetchAndSetTasks
    );
  };

  return (
    <TaskTable
      tasks={tasks}
      showCheckbox
      onTaskStatusChange={handleStatusChange}
    />
  );
};

export const ThisWeekTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAndSetTasks = async () => {
    const data = await fetchTasks();
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    setTasks(
      data.filter(
        task =>
          task.enteredDate >= startOfWeek &&
          task.enteredDate <= endOfWeek &&
          task.taskStatus !== 'Completed' // Exclude completed tasks
      )
    );
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const handleStatusChange = task => {
    updateTaskStatus(
      task.taskId,
      task.transactionId,
      task.stageId,
      fetchAndSetTasks
    );
  };

  return (
    <TaskTable
      tasks={tasks}
      showCheckbox
      onTaskStatusChange={handleStatusChange}
    />
  );
};

export const ThisMonthTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAndSetTasks = async () => {
    const data = await fetchTasks();
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setTasks(
      data.filter(
        task =>
          task.enteredDate >= startOfMonth &&
          task.enteredDate <= endOfMonth &&
          task.taskStatus !== 'Completed' // Exclude completed tasks
      )
    );
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const handleStatusChange = task => {
    updateTaskStatus(
      task.taskId,
      task.transactionId,
      task.stageId,
      fetchAndSetTasks
    );
  };

  return (
    <TaskTable
      tasks={tasks}
      showCheckbox
      onTaskStatusChange={handleStatusChange}
    />
  );
};

export const OverdueTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAndSetTasks = async () => {
    const data = await fetchTasks();
    setTasks(
      data.filter(
        task => task.enteredDate < new Date() && task.taskStatus !== 'Completed'
      )
    );
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const handleStatusChange = task => {
    updateTaskStatus(
      task.taskId,
      task.transactionId,
      task.stageId,
      fetchAndSetTasks
    );
  };

  return (
    <TaskTable
      tasks={tasks}
      showCheckbox
      onTaskStatusChange={handleStatusChange}
    />
  );
};

export const FinishedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const data = await fetchTasks();
      setTasks(data.filter(task => task.taskStatus === 'Completed'));
    };
    fetchCompletedTasks();
  }, []);

  return <TaskTable tasks={tasks} showCheckbox={false} />;
};

export default {
  FinishedTasks,
  OverdueTasks,
  ScheduledTasks,
  ThisMonthTasks,
  fetchTasks,
  ThisWeekTasks,
  TodayTasks,
};
