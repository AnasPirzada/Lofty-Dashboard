import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const TransactionForm = ({ closeModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [stage_id, setStageId] = useState(''); // Store stage_id
  const [createdBy, setCreatedBy] = useState(''); // Editable createdBy field
  const [state, setState] = useState('IL'); // Default state set to 'IL'
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setCreatedBy(storedUser.username); // Set createdBy to the stored username
    }
  }, []);

  const handleSave = async () => {
    if (
      !firstName ||
      !lastName ||
      !address1 ||
      !city ||
      !state ||
      !zip ||
      !listPrice ||
      !stage_id ||
      !createdBy
    ) {
      toast.error('Please fill out all required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      address1,
      address2: address2 || null,
      city,
      state,
      zip,
      list_price: parseFloat(listPrice),
      stage_id: parseInt(stage_id),
      delete_ind: false,
      created_by: createdBy,
    };

    try {
      const response = await fetch(
        'https://api.tkglisting.com/api/transactions/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success('Transaction saved successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/StepperSection');
      } else {
        throw new Error('Failed to save transaction');
      }
    } catch (error) {
      toast.error('Error saving transaction. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg md:max-w-2xl lg:w-[700px]'>
      <ToastContainer />
      <h2 className='text-xl font-semibold mb-4'>Add Details</h2>

      {/* First Name */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          First Name *
        </label>
        <input
          type='text'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* Last Name */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Last Name *
        </label>
        <input
          type='text'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* Address 1 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Address 1 *
        </label>
        <input
          type='text'
          value={address1}
          onChange={e => setAddress1(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* Address 2 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Address 2
        </label>
        <input
          type='text'
          value={address2}
          onChange={e => setAddress2(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* City */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          City *
        </label>
        <input
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* State Dropdown */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          State *
        </label>
        <select
          value={state}
          onChange={e => setState(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        >
          <option value='IL'>IL</option>
        </select>
      </div>

      {/* Zip */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Zip *
        </label>
        <input
          type='text'
          value={zip}
          onChange={e => setZip(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* List Price */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          List Price *
        </label>
        <input
          type='number'
          value={listPrice}
          onChange={e => setListPrice(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* Stage Selection */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Stage *
        </label>
        <select
          value={stage_id}
          onChange={e => setStageId(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        >
          <option value=''>Select Stage</option>
          <option value='1'>Pre Listing</option>
          <option value='2'>Active listing</option>
          <option value='3'>Undercontract</option>
        </select>
      </div>

      {/* Client Name*/}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Client Name *
        </label>
        <input
          type='text'
          value={createdBy}
          disabled
          onChange={e => setCreatedBy(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end mt-4'>
        <button
          className='px-4 py-2 text-gray-600 rounded-lg bg-gray-200 mr-2'
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className='px-4 py-2 text-white bg-blue-500 rounded-lg'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
