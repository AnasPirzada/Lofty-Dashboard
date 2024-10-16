// Import dependencies
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toolbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='grid grid-cols-12 gap-4 border-border-1 justify-between p-2 items-center'>
      {/* Search input */}
      <div className='col-span-12 md:col-span-5'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-gray-700'
          placeholder='Search by Transaction, Address, Lead, Note'
        />
      </div>
      <div className='col-span-3 md:col-span-3'></div>
      <div className='col-span-12 md:col-span-4'>
        <div className='col-span-6 sm:col-span-6 relative'>
          <select className='w-full border border-gray-300 rounded-lg px-4 py-2  focus:border-gray-700'>
            <option>Expected Close/Closed Date</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const TableWithToolbar = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        'https://api.tkglisting.com/api/transactions'
      );
      console.log(response);

      const data = await response.json();
      console.log();
      toast.success(data.message);

      // Map the required fields from the response
      const mappedData = data.transactions.map(transaction => ({
        state_id: transaction.state, // Property Address
        address1: transaction.address1, // Property Address
        address2: transaction.address2, // Property Address
        city: transaction.city, // Property Address
        state: transaction.state, // Property Address

        created_by: transaction.created_by, // Client Name
        first_name: transaction.first_name, // Client Name
        last_name: transaction.last_name, // Client Name

        task_status: transaction.task_status || 'Open', // Tasks
        expectedClose: transaction.expectedClose || null, // Expected Close Date, show N/A if null
        list_price: transaction.list_price, // Sale Price
        transactionOwner: transaction.transactionOwner, // Original fields
        stage_id: mapStage(Number(transaction.stage_id)), // Map stage_id to readable form
        closedDate: transaction.closedDate,
      }));

      setTransactions(mappedData);
      setFilteredData(mappedData);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    }
  };

  const mapStage = stage_id => {
    switch (stage_id) {
      case 1:
        return 'Pre Listing';
      case 2:
        return 'Active listing';
      case 3:
        return 'Undercontract';
      default:
        return '';
    }
  };

  const handleSearch = term => {
    const filtered = transactions.filter(row =>
      row.state_id.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleDateChange = (date, index) => {
    const updatedTransactions = [...filteredData];
    updatedTransactions[index].expectedClose = date; // Update the expectedClose date
    setFilteredData(updatedTransactions); // Update state
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <ToastContainer />
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
                  Transaction Name
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>Lead</th>
                <th className='px-4 py-2 text-left text-gray-700'>Task</th>
                <th className='px-4 py-2 text-left text-gray-700'>Stage</th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Expected Close
                </th>
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
                    {row.address1} {row.address2} {row.city} {row.state}
                  </td>
                  <td className='px-4 py-2 text-gray-600'>
                    {row.first_name} {row.last_name}
                  </td>
                  <td className='px-4 py-2 text-gray-600'>{row.task_status}</td>
                  <td className='px-4 py-2 text-gray-600'>{row.stage_id}</td>
                  <td className='px-4 py-2 text-gray-600 flex justify-start items-center'>
                    {row.expectedClose ? (
                      row.expectedClose
                    ) : (
                      <span className='text-black'>N/A</span>
                    )}

                    {/* Add a calendar icon that triggers date selection */}
                    <button
                      className='ml-2 focus:outline-none'
                      onClick={() => {
                        const datePicker = document.getElementById(
                          `date-picker-${index}`
                        );
                        datePicker.click(); // Programmatically open the date picker
                      }}
                    >
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

                    {/* Date input (Hidden by default, shown when calendar is clicked) */}
                    <input
                      type='date'
                      className='hidden'
                      id={`date-picker-${index}`} // Unique ID for each row
                      onChange={e => handleDateChange(e.target.value, index)}
                    />
                  </td>
                  <td className='px-4 py-2 text-gray-600'>${row.list_price}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className='flex justify-between items-center my-2'>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithToolbar;
