import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Toolbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='grid grid-cols-12 gap-4 border-border-1 justify-between p-2 items-center'>
      {/* Search input */}
      <div className='col-span-12 md:col-span-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-gray-700'
          placeholder='Search by Transaction, Address, Lead, Note'
        />
      </div>
      <div className='col-span-12 md:col-span-1 grid grid-cols-12 gap-4 items-center'></div>
      {/* Dropdowns and Buttons */}
      <div className='col-span-12 md:col-span-7 grid grid-cols-12 gap-4 items-center'>
        {/* Transaction Owner Dropdown */}
        <div className='col-span-6 sm:col-span-3 relative'>
          {/* <select className='w-full border border-gray-300 rounded-lg px-4 py-2  focus:border-gray-700 '>
            <option >Transaction Owner</option>
            <option >Liam Neeson</option>
            <option > Doe</option>
            <option >Jane </option>
          </select> */}
        </div>

        {/* Expected Close/Closed Date Dropdown */}
        <div className='col-span-6 sm:col-span-3 relative'>
          <select className='w-full border border-gray-300 rounded-lg px-4 py-2  focus:border-gray-700'>
            <option>Expected Close/Closed Date</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        {/* More Filters Button */}
        <div className='col-span-6 sm:col-span-3'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='w-full border border-gray-300 rounded-lg px-4 py-2  focus:border-gray-700'
          >
            More Filters (0)
          </motion.button>
        </div>

        {/* Columns Button */}
        <div className='col-span-6 sm:col-span-3'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='w-full border border-gray-300 rounded-lg px-4 py-2  focus:border-gray-700'
          >
            Columns
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const tableData = [
  {
    transactionName: '1001 Main St, Springfield, IL 62701',
    lead: 'Alice Johnson',
    transactionOwner: 'Bob Smith',
    tasks: '15/20',
    stage: 'Active Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$250,000',
  },
  {
    transactionName: '2002 Oak St, Springfield, IL 62702',
    lead: 'Charlie Brown',
    transactionOwner: 'Diana Prince',
    tasks: '7/10',
    stage: 'Pre-Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$300,000',
  },
  {
    transactionName: '3003 Pine St, Springfield, IL 62703',
    lead: 'Eva Green',
    transactionOwner: 'Frank Castle',
    tasks: '25/30',
    stage: 'Under Contract',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$450,000',
  },
  {
    transactionName: '4004 Elm St, Springfield, IL 62704',
    lead: 'George Lopez',
    transactionOwner: 'Hannah Baker',
    tasks: '12/15',
    stage: 'Closed',
    expectedClose: '09/30/2024',
    closedDate: '09/25/2024',
    salesPrice: '$350,000',
  },
  {
    transactionName: '5005 Birch St, Springfield, IL 62705',
    lead: 'Isabella Martinez',
    transactionOwner: 'Jake Peralta',
    tasks: '10/12',
    stage: 'Active Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$275,000',
  },
  {
    transactionName: '6006 Cedar Ln, Springfield, IL 62706',
    lead: 'James Tiberius',
    transactionOwner: 'Karen Page',
    tasks: '22/30',
    stage: 'Pre-Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$400,000',
  },
  {
    transactionName: '7007 Spruce St, Springfield, IL 62707',
    lead: 'Liam Neeson',
    transactionOwner: 'Liam Neeson',
    tasks: '5/5',
    stage: 'Closed',
    expectedClose: '09/20/2024',
    closedDate: '09/18/2024',
    salesPrice: '$500,000',
  },
  {
    transactionName: '8008 Maple St, Springfield, IL 62708',
    lead: 'Nora Roberts',
    transactionOwner: 'Oliver Twist',
    tasks: '18/25',
    stage: 'Under Contract',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$600,000',
  },
  {
    transactionName: '9009 Willow St, Springfield, IL 62709',
    lead: 'Peter Parker',
    transactionOwner: 'Quinn Fabray',
    tasks: '9/15',
    stage: 'Active Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$300,000',
  },
  {
    transactionName: '1010 Ash St, Springfield, IL 62710',
    lead: 'Rachel Green',
    transactionOwner: 'Steve Rogers',
    tasks: '24/30',
    stage: 'Pre-Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$225,000',
  },
  {
    transactionName: '1111 Pinecrest Rd, Springfield, IL 62711',
    lead: 'Tony Stark',
    transactionOwner: 'Ursula Andress',
    tasks: '15/20',
    stage: 'Closed',
    expectedClose: '08/30/2024',
    closedDate: '08/29/2024',
    salesPrice: '$700,000',
  },
  {
    transactionName: '1212 Cypress Ct, Springfield, IL 62712',
    lead: 'Vera Wang',
    transactionOwner: 'Winston Churchill',
    tasks: '30/40',
    stage: 'Active Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$450,000',
  },
  {
    transactionName: '1313 Crescent Dr, Springfield, IL 62713',
    lead: 'Xena Warrior',
    transactionOwner: 'Yoda',
    tasks: '13/15',
    stage: 'Under Contract',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$550,000',
  },
  {
    transactionName: '1414 Dawn Ave, Springfield, IL 62714',
    lead: 'Zachary Taylor',
    transactionOwner: 'Liam Neeson',
    tasks: '19/25',
    stage: 'Pre-Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$370,000',
  },
  {
    transactionName: '1515 Evergreen Blvd, Springfield, IL 62715',
    lead: 'Bruce Wayne',
    transactionOwner: 'Caitlyn Jenner',
    tasks: '20/30',
    stage: 'Closed',
    expectedClose: '09/05/2024',
    closedDate: '09/01/2024',
    salesPrice: '$800,000',
  },
  {
    transactionName: '1616 Forest Dr, Springfield, IL 62716',
    lead: 'Diana Prince',
    transactionOwner: 'Elon Musk',
    tasks: '14/18',
    stage: 'Active Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$620,000',
  },
  {
    transactionName: '1717 Garden St, Springfield, IL 62717',
    lead: 'Fred Flintstone',
    transactionOwner: 'Gwen Stefani',
    tasks: '25/32',
    stage: 'Under Contract',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$490,000',
  },
  {
    transactionName: '1818 Hilltop Rd, Springfield, IL 62718',
    lead: 'Harry Potter',
    transactionOwner: 'Iris Apfel',
    tasks: '17/20',
    stage: 'Pre-Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$320,000',
  },
  {
    transactionName: '1919 Indigo Way, Springfield, IL 62719',
    lead: 'Jack Sparrow',
    transactionOwner: 'Kylie Jenner',
    tasks: '28/36',
    stage: 'Active Listing',
    expectedClose: 'N/A',
    closedDate: 'N/A',
    salesPrice: '$440,000',
  },
  {
    transactionName: '2020 Juno Dr, Springfield, IL 62720',
    lead: 'Liam Gallagher',
    transactionOwner: 'Megan Fox',
    tasks: '11/15',
    stage: 'Closed',
    expectedClose: '09/12/2024',
    closedDate: '09/10/2024',
    salesPrice: '$675,000',
  },
];

const TableWithToolbar = () => {
  const [filteredData, setFilteredData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = term => {
    const filtered = tableData.filter(row =>
      row.transactionName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className=' bg-white'>
        <Toolbar onSearch={handleSearch} />
      </div>
      <div className='h-96 border border-1  bg-white mb-10 overflow-x-auto lg:overflow-x-hidden overflow-y-auto custom-scrollbar'>
        {/* Table with pagination */}
        <div className=' '>
          <motion.table
            className='min-w-full table-auto  shadow-lg rounded-lg'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              <tr className='bg-white text-nowrap'>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Property Address{' '}
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Client Name
                </th>
                {/* <th className='px-4 py-2 text-left text-gray-700'>
                  Transaction Owner
                </th> */}
                <th className='px-4 py-2 text-left text-gray-700'>Tasks</th>
                <th className='px-4 py-2 text-left text-gray-700'>Stage</th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Expected Close
                </th>
                {/* <th className='px-4 py-2 text-left text-gray-700'>
                  Closed Date
                </th> */}
                <th className='px-4 py-2 text-left text-gray-700'>
                  Sales Price
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((row, index) => (
                <motion.tr
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className='border-b text-nowrap hover:bg-gray-50'
                >
                  <td className='px-4 py-2 text-gray-600'>
                    {row.transactionName}
                  </td>
                  <td className='px-4 py-2 text-gray-600'>{row.lead}</td>
                  {/* <td className='px-4 py-2 text-gray-600'>
                    {row.transactionOwner}
                  </td> */}
                  <td className='px-4 py-2 text-gray-600 flex items-center justify-start'>
                    <img
                      src='/loader-alt-svgrepo-com.svg'
                      alt=''
                      className='w-8 h-8 pe-2'
                    />
                    {row.tasks}
                  </td>
                  <td className='px-4 py-2 text-gray-600'>{row.stage}</td>
                  <td className='px-4 py-2 text-gray-600 flex justify-start items-center'>
                    {row.expectedClose}

                    {/* Add a calendar icon that triggers date selection */}
                    <button className='ml-2 focus:outline-none'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-500 hover:text-gray-900'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M8 7V3m8 4V3m-9 8h10m-10 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </button>

                    {/* Hidden date input that can be toggled */}
                    <input
                      type='date'
                      className='hidden'
                      id={`date-picker-${index}`} // Ensure unique ID for each row
                    />
                  </td>

                  {/* <td className='px-4 py-2 text-gray-600'>{row.closedDate}</td> */}
                  <td className='px-4 py-2 text-gray-600'>{row.salesPrice}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Pagination Controls */}
        {/* <div className='flex justify-between items-center mt-2'>
        <button
          onClick={handlePreviousPage}
          className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default TableWithToolbar;
