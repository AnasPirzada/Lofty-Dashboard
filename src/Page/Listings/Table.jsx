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
      const response = await fetch('http://localhost:3000/api/transactions');
      const data = await response.json();

      // Map the required fields from the response
      const mappedData = data.map(transaction => ({
        state_id: transaction.state_id, // Property Address
        createdBy: transaction.createdBy, // Client Name
        task_status: transaction.task_status, // Tasks
        expectedClose: transaction.expectedClose, // Expected Close Date
        sale_price: transaction.sale_price, // Sale Price
        transactionOwner: transaction.transactionOwner, // Original fields
        stage: transaction.stage,
        closedDate: transaction.closedDate,
      }));

      setTransactions(mappedData);
      setFilteredData(mappedData);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    }
  };

  const handleSearch = term => {
    const filtered = transactions.filter(row =>
      row.state_id.toLowerCase().includes(term.toLowerCase())
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
                  Property Address
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Client Name
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>Tasks</th>
                <th className='px-4 py-2 text-left text-gray-700'>Stage</th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Expected Close
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Sales Price
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Transaction Owner
                </th>
                <th className='px-4 py-2 text-left text-gray-700'>
                  Closed Date
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
                  <td className='px-4 py-2 text-gray-600'>{row.state_id}</td>
                  <td className='px-4 py-2 text-gray-600'>{row.createdBy}</td>
                  <td className='px-4 py-2 text-gray-600'>{row.task_status}</td>
                  <td className='px-4 py-2 text-gray-600'>{row.stage}</td>
                  <td className='px-4 py-2 text-gray-600'>
                    {row.expectedClose}
                  </td>
                  <td className='px-4 py-2 text-gray-600'>{row.sale_price}</td>
                  <td className='px-4 py-2 text-gray-600'>
                    {row.transactionOwner}
                  </td>
                  <td className='px-4 py-2 text-gray-600'>
                    {row.closedDate || 'N/A'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-between items-center mt-2'>
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
    </div>
  );
};

export default TableWithToolbar;
