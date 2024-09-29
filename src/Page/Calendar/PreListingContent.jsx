// /components/PreListingContent.jsx
import React from 'react';

export const PreListingContent = () => {
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
      address: '654 Giggle St, Miami, FL 33101',
      taskDescription:
        'Ensure that the property’s WiFi is strong enough to watch Netflix in the shower.',
      assignedTo: 'CP',
      dueDate: 'Tomorrow',
    },
    {
      transactionType: 'Transaction',
      address: '753 Snicker Cir, Boston, MA 02116',
      taskDescription:
        'Organize a housewarming party for the squirrels in the backyard.',
      assignedTo: 'TJ',
      dueDate: 'Tomorrow',
    },
    {
      transactionType: 'Transaction',
      address: '321 Comedy Blvd, Denver, CO 80202',
      taskDescription:
        'Find a buyer who doesn’t mind living next to a loud chicken farm.',
      assignedTo: 'AB',
      dueDate: 'In 2 days',
    },
    {
      transactionType: 'Transaction',
      address: '987 Pun Ln, Seattle, WA 98101',
      taskDescription:
        'Explain to the client that “rustic” doesn’t mean “falling apart.”',
      assignedTo: 'RS',
      dueDate: 'In 3 days',
    },
  
    
  
    {
      transactionType: 'Transaction',
      address: '369 Giggle St, Nashville, TN 37201',
      taskDescription:
        'Create a listing that emphasizes the “potential” rather than “needs work.”',
      assignedTo: 'KT',
      dueDate: 'In 4 days',
    },
    {
      transactionType: 'Transaction',
      address: '852 Prank Way, Las Vegas, NV 89101',
      taskDescription:
        'Confirm that the neighbor’s pet llama won’t be included in the sale.',
      assignedTo: 'NW',
      dueDate: 'In 5 days',
    },
    {
      transactionType: 'Transaction',
      address: '741 LOL Dr, Austin, TX 73301',
      taskDescription:
        'Convince the neighbor’s dog to stop barking during house tours.',
      assignedTo: 'MK',
      dueDate: 'Next Week',
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

export default PreListingContent;
