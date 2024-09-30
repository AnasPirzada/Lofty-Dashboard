import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TransactionForm = ({ closeModal }) => {
  const [transactionName, setTransactionName] = useState('');
  const [addressMatch, setAddressMatch] = useState(false); // Initially hidden
  const [selectedAddress, setSelectedAddress] = useState(''); // Store selected address
  const [transactionType, setTransactionType] = useState('Listing');
  const [transactionStage, setTransactionStage] = useState('Pre-Listing');
  const [associatedLead, setAssociatedLead] = useState('');
  const [transactionOwner, setTransactionOwner] = useState('');
  const [showTransactionSuggestions, setShowTransactionSuggestions] =
    useState(true); // For transaction name suggestions
  const [showLeadSuggestions, setShowLeadSuggestions] = useState(true); // For associated lead suggestions

  // Example suggestions for Transaction Name (addresses)
  const addressSuggestions = [
    '123 Main Street, Kingston, IL 60145',
    '456 Oak Avenue, Springfield, IL 62701',
    '789 Elm Street, Chicago, IL 60616',
  ];

  // Example suggestions for Associated Lead (names)
  const leadSuggestions = [
    'Kari Kohler',
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
  ];

  // Handle click on suggestion for Transaction Name (address)
  const handleTransactionSuggestionClick = suggestion => {
    setTransactionName(suggestion);
    setSelectedAddress(suggestion); // Set the selected address
    setShowTransactionSuggestions(false); // Hide suggestions after selection
    setAddressMatch(true); // Show the address match section
  };

  // Handle click on suggestion for Associated Lead (name)
  const handleLeadSuggestionClick = leadName => {
    setAssociatedLead(leadName);
    setTransactionOwner(leadName); // Update transaction owner placeholder
    setShowLeadSuggestions(false); // Hide suggestions after selection
  };

  return (
    <div className='p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg md:max-w-2xl lg:w-[700px]'>
      <h2 className='text-xl font-semibold mb-4'>Add Transaction</h2>

      {/* Transaction Name */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Transaction Name *
        </label>
        <input
          type='text'
          value={transactionName}
          onChange={e => {
            setTransactionName(e.target.value);
            setShowTransactionSuggestions(true); // Show suggestions while typing
          }}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />

        {/* Suggestions for Transaction Name (addresses) */}
        {transactionName && showTransactionSuggestions && (
          <ul className='bg-white border border-gray-300 mt-2 rounded-md shadow-md'>
            {addressSuggestions
              .filter(suggestion =>
                suggestion.toLowerCase().includes(transactionName.toLowerCase())
              )
              .map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleTransactionSuggestionClick(suggestion)}
                  className='p-2 hover:bg-gray-200 cursor-pointer'
                >
                  {suggestion}
                </li>
              ))}
          </ul>
        )}

        {/* Animate the addressMatch section */}
        <AnimatePresence>
          {addressMatch && (
            <motion.div
              className='mt-4 p-3 bg-gray-100 rounded-md'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className='text-sm text-gray-700'>
                You selected: <strong>{selectedAddress}</strong>
              </p>
              <p className='text-sm text-gray-700'>
                The address you entered may match one of the following listings
                on your website. Please select a listing if you would like to
                link it to your transaction.
              </p>
              <div className='mt-2'>
                <label className='flex items-center'>
                  <input type='radio' name='address' className='mr-2' />
                  {selectedAddress}
                </label>
                <div className='flex justify-end mt-2'>
                  <button
                    className='text-[#616161] mr-4'
                    onClick={() => setAddressMatch(false)} // Hide the section if 'Ignore' is clicked
                  >
                    Ignore
                  </button>
                  <button className='text-white bg-[#616161] px-4 py-2 rounded-md'>
                    Link
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Associated Lead */}
      <div className='mb-4 relative'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Associated Lead *
        </label>
        <div className='relative'>
          <div className='w-full flex justify-start items-center px-4 py-2 border border-gray-300 rounded-md '>
            <img
              src='/search-svgrepo-com.svg'
              className='w-5 h-5 me-3'
              alt=''
            />

            <input
              type='text'
              value={associatedLead}
              onChange={e => {
                setAssociatedLead(e.target.value);
                setShowLeadSuggestions(true); // Show suggestions while typing
              }}
              className='w-full '
              placeholder='Search Lead'
            />
          </div>
          {/* Suggestions for Associated Lead (names) */}
          {associatedLead && showLeadSuggestions && (
            <ul className='bg-white border border-gray-300 mt-2 rounded-md shadow-md absolute w-full'>
              {leadSuggestions
                .filter(suggestion =>
                  suggestion
                    .toLowerCase()
                    .includes(associatedLead.toLowerCase())
                )
                .map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleLeadSuggestionClick(suggestion)}
                    className='p-2 hover:bg-gray-200 cursor-pointer'
                  >
                    {suggestion}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Transaction Owner */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Transaction Owner *
        </label>
        <input
          type='text'
          value={transactionOwner}
          placeholder='Select a lead first'
          disabled
          className='w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600'
        />
      </div>

      {/* Transaction Type */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Transaction Type *
        </label>
        <motion.select
          value={transactionType}
          onChange={e => setTransactionType(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <option>Purchase</option>
          <option>Listing</option>
          <option>Lease</option>
          <option>Other</option>
        </motion.select>
      </div>

      {/* Transaction Stage */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Transaction Stage *
        </label>
        <motion.select
          value={transactionStage}
          onChange={e => setTransactionStage(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <option>Pre-Listing</option>
          <option>Active-Listing</option>
          <option>Under Contract</option>
          <option>Pending</option>
          <option>Cancelled</option>
          <option>Closed</option>
        </motion.select>
      </div>

      {/* Action Buttons */}
      <div className='grid grid-cols-1 md:grid-cols-2 justify-between items-center mt-4 gap-4'>
        <button className='border rounded-lg border-gray-400 flex justify-start items-center py-2 px-2'>
          <img src='/setting.svg' className='w-3 h-3 me-3' alt='' />
          Details View
        </button>
        <div className='flex justify-end'>
          <button
            className='px-4 py-2 text-gray-600 rounded-lg bg-gray-200 mr-2'
            onClick={closeModal}
          >
            Cancel
          </button>
          <Link to='/StepperSection'>
            <motion.button
              className='px-4 py-2 text-white bg-[#616161] rounded-md'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
