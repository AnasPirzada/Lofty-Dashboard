import React from 'react';
const data = [
  {
    title: 'All Transactions',
    count: 15,
    amount: '$0',
  },
  {
    title: 'Pre-Listing',
    count: 2,
    amount: '$0',
  },
  {
    title: 'Active Listing',
    count: 7,
    amount: '$0',
  },
  {
    title: 'Under Contract',
    count: 6,
    amount: '$0',
  },
  // {
  //   title: 'Pending',
  //   count: 0,
  //   amount: '$0',
  // },
  {
    title: 'Closed',
    count: 0,
    amount: '$0',
  },
  // {
  //   title: 'Cancelled',
  //   count: 0,
  //   amount: '$0',
  // },
];

const ListingsSection = () => {
  return (
    <div>
      {/* Header Section */}
      <div className='flex justify-between w-full flex-wrap items-center mb-4'>
        <div className='flex items-center'>
          <p className='font-semibold text-sm text-gray-700'>Volume</p>
          <img src='/down.svg' className='w-5 ml-2 mt-2 h-5' alt='dropdown' />
        </div>
        {/* <div>
          <img src='/setting.svg' className='w-6 h-6' alt='settings' />
        </div> */}
      </div>

      {/* Transaction Section - Responsive Layout */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4'>
        {data.map((item, index) => (
          <div
            key={item.title}
            className={` text-start ${
              index === 0 ? 'text-gray-700' : 'text-gray-400'
            }`} // First item highlighted in blue
          >
            <div className='flex justify-start items-center space-x-2'>
              <p
                className={`font-semibold text-sm ${
                  index === 0 ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {item.title}
              </p>
              <span className='text-sm text-gray-400'>({item.count})</span>
            </div>
            <div className='my-2'>
              <p
                className={`font-bold text-2xl ${
                  index === 0 ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {item.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsSection;
