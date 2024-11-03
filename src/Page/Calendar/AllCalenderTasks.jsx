// /components/PreListingContent.jsx
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
        return response.json();
      })
      .then(data => {
        if (data && data.transactions) {
          const allTasks = data.transactions.flatMap(transaction => {
            return transaction.dates.map(date => ({
              transactionName: transaction.transaction_name,
              transaction_id: transaction.transaction_id,
              address: `${transaction.address}`,
              stage_id: date.stage_id,
              taskName: date.task.task_name,
              task_id: date.task.task_id,
              task_status: date.task.task_status,
              enteredDate: date.entered_date
                ? new Date(date.entered_date)
                : null,
            }));
          });
          setTasks(allTasks);
        }
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Function to call the update status API
  const updateTaskStatus = async task => {
    try {
      const response = await fetch(
        `https://api.tkglisting.com/api/transactions/${task.task_id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transaction_id: task.transaction_id,
            stage_id: task.stage_id,
            task_status: task.task_status,
          }),
        }
      );
      console.log(response);

      if (response.ok) {
        toast.success('Task status updated successfully!');
        // Remove the task from the list after marking it as completed
        setTasks(prevTasks =>
          prevTasks.filter(t => t.task_id !== task.task_id)
        );
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Error updating task status');
    }
  };

  // Function to format the date for display
  const formatDate = date => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
          {tasks.map(
            (task, index) =>
              task.task_status !== 'Completed' && ( // Only show tasks that are not completed
                <tr
                  key={index}
                  className='border-b text-nowrap hover:bg-gray-50 transition duration-150 ease-in-out'
                >
                  {/* Transaction column */}
                  <td className='px-4 py-3 flex items-center'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      checked={task.task_status === 'Completed'}
                      onChange={() => updateTaskStatus(task)} // Call update on change
                      disabled={task.task_status === 'Completed'} // Disable checkbox if task is completed
                    />
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
                    <span>{formatDate(task.enteredDate)}</span>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCalenderTasks;
