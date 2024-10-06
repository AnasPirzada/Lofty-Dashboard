// /components/PreListingContent.jsx
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PreListingContent = () => {
  const [tasks, setTasks] = useState([]);

  // Function to map task days to human-readable labels
  const mapTaskDays = task_days => {
    switch (task_days) {
      case 1:
        return 'Today';
      case 2:
        return 'Tomorrow';
      // case 3:
      //   return 'Next Week';
      // case 4:
      //   return 'Yesterday';
      default:
        return `Next Week`;
    }
  };

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks');
      const data = await response.json();

      // Assuming data contains an array of tasks, update state
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='overflow-x-auto bg-white'>
      <ToastContainer />
      <table className='w-full border border-gray-200 rounded-lg'>
        <thead>
          <tr className='border-b'>
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
              {/* Transaction column */}
              <td className='px-4 py-3 flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-nowrap'>{task.transactionType}</span>
              </td>
              {/* Address column */}
              <td className='px-4 py-3'>
                <span className='text-nowrap'>{task.state}</span>
              </td>
              {/* Task Description column */}
              <td className='px-4 py-3'>
                <span>{task.task_name}</span>
              </td>
              {/* Task Days column */}
              <td className='px-4 py-3'>
                <span>{mapTaskDays(task.task_days)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreListingContent;
