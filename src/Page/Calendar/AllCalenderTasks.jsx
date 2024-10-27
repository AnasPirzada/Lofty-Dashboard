// /components/PreListingContent.jsx
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AllCalenderTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API
  useEffect(() => {
    fetch('https://api.tkglisting.com/api/dates/calendar')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Return the promise from response.json()
      })
      .then(data => {
        if (data && data.transactions) {
          // Flatten dates and tasks for easier rendering
          const allTasks = data.transactions.flatMap(transaction => {
            return transaction.dates.map(date => ({
              transactionName: transaction.transaction_name,
              address: `${transaction.address}`,
              taskName: date.task.task_name,
              enteredDate: date.entered_date
                ? new Date(date.entered_date)
                : null, // Ensure we check for null
              taskStatus: date.task.task_status,
            }));
          });
          setTasks(allTasks);
        }
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Function to format the date for display
  const formatDate = date => {
    if (!date) return 'N/A'; // Fallback if the date is null
    return date.toLocaleDateString(); // Format the date for display
  };

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
                <span className='text-nowrap'>{task.transactionName}</span>
              </td>
              {/* Address column */}
              <td className='px-4 py-3'>
                <span className='text-nowrap'>{task.address}</span>
              </td>
              {/* Task Description column */}
              <td className='px-4 py-3'>
                <span>{task.taskName}</span>
              </td>
              {/* Task Days column */}
              <td className='px-4 py-3'>
                <span>{formatDate(task.enteredDate)}</span>{' '}
                {/* Format date for display */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCalenderTasks;
