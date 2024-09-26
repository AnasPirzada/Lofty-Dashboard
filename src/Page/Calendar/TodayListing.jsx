// /components/PreListingContent.jsx
import React from 'react';

export const TodayListing = () => {
  // Adjusted data to fit the example
  const tasks = [
    {
      transactionType: 'Transaction',
      address: '456 Joke St, Laughter City, IL 62701',
      taskDescription:
        'Convince the client that their property isn’t actually haunted.',
      assignedTo: 'JD',
      dueDate: 'Today',
    },
    {
      transactionType: 'Transaction',
      address: '789 Meme Ave, Internetville, IL 60601',
      taskDescription:
        'Set up a showing for the client’s cat (it’s very particular about lighting).',
      assignedTo: 'LM',
      dueDate: 'Today',
    },

    {
      transactionType: 'Transaction',
      address: '159 Chuckle Blvd, Phoenix, AZ 85001',
      taskDescription:
        'Replace the “Beware of Ghosts” sign with something less terrifying.',
      assignedTo: 'LD',
      dueDate: 'Today',
    },
    {
      transactionType: 'Transaction',
      address: '159 Chuckle Blvd, Phoenix, AZ 85001',
      taskDescription:
        'Replace the “Beware of Ghosts” sign with something less terrifying.',
      assignedTo: 'LD',
      dueDate: 'Today',
    },
    {
      transactionType: 'Transaction',
      address: '159 Chuckle Blvd, Phoenix, AZ 85001',
      taskDescription:
        'Replace the “Beware of Ghosts” sign with something less terrifying.',
      assignedTo: 'LD',
      dueDate: 'Today',
    },
    {
      transactionType: 'Transaction',
      address: '159 Chuckle Blvd, Phoenix, AZ 85001',
      taskDescription:
        'Replace the “Beware of Ghosts” sign with something less terrifying.',
      assignedTo: 'LD',
      dueDate: 'Today',
    },
    {
      transactionType: 'Transaction',
      address: '159 Chuckle Blvd, Phoenix, AZ 85001',
      taskDescription:
        'Replace the “Beware of Ghosts” sign with something less terrifying.',
      assignedTo: 'LD',
      dueDate: 'Today',
    },
    {
      transactionType: 'Transaction',
      address: '159 Chuckle Blvd, Phoenix, AZ 85001',
      taskDescription:
        'Replace the “Beware of Ghosts” sign with something less terrifying.',
      assignedTo: 'LD',
      dueDate: 'Today',
    },
  ];

  return (
    <div className='overflow-x-auto bg-white'>
      <table className='w-full border border-gray-200 rounded-lg'>
        <thead>
          {/* <tr className='border-b'>
            <th className='px-4 py-2 text-left text-gray-600'>Transaction</th>
            <th className='px-4 py-2 text-left text-gray-600'>Address</th>
            <th className='px-4 py-2 text-left text-gray-600'>
              Task Description
            </th>
            <th className='px-4 py-2 text-left text-gray-600'>Assigned To</th>
            <th className='px-4 py-2 text-left text-gray-600'>Due Date</th>
          </tr> */}
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
                <span className='text-nowrap'>{task.address}</span>
              </td>
              {/* Task Description column */}
              <td className='px-4 py-3'>
                <span>{task.taskDescription}</span>
              </td>
              {/* Assigned To column */}
              <td className='px-4 py-3'>
                <span className='bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold'>
                  {task.assignedTo}
                </span>
              </td>
              {/* Due Date column */}
              <td className='px-4 py-3'>
                <span>{task.dueDate}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayListing;
