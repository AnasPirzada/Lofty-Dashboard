import React, { useEffect, useRef, useState } from 'react';
import AssigneeSelector from '../../Components/AssigneeSelector';

export const SideSection = ({ setSelectedOption, selectedOption }) => {
  const menuItems = [
    { name: 'Dates', hasBadge: false },
    { name: 'Property', hasBadge: false },
    { name: 'Checklists', hasBadge: true, count: '0/0' },
    { name: 'Accounting', hasBadge: false },
    { name: 'Contacts', hasBadge: false },
    { name: 'Documents', hasBadge: true, count: '0' },
    { name: 'Offers', hasBadge: true, count: '0' },
    { name: 'History', hasBadge: false },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const iconRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const togglePopup = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPopupPosition({ top: rect.bottom, left: rect.left });
    }
    setShowPopup(!showPopup);
  };

  const handleClickOutside = event => {
    if (iconRef.current && !iconRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full md:w-80 h-auto md:h-[120vh] bg-white p-4 shadow-lg mt-1'>
      {/* Header and Address Sections */}
      <div className='flex items-center justify-between mb-4'>
        <span className='bg-gray-200 text-[#9094A5] px-2 py-1 text-xs rounded-md'>
          Listing
        </span>
        <div className='text-gray-400 cursor-pointer'>⋮</div>
      </div>
      <div className='text-lg font-bold text-gray-800 mb-2 leading-tight'>
        123 Main St, Cambridge, MA 02142
      </div>
      <div className='flex justify-start items-center'>
        <img src='/user.svg' className='w-5 h-5 me-4' alt='' />
        <p className='first text-sm font-normal'>
          Transaction Owner{' '}
          <span className='text-gray-400 font-normal text-sm'>
            Sunny (Agent)
          </span>
        </p>
        <img
          ref={iconRef}
          onClick={togglePopup}
          src='/left-arrow-backup-2-svgrepo-com.svg'
          className='h-3 w-3 ms-1'
          alt=''
        />

        {showPopup && (
          <div
            className='absolute z-10 border rounded bg-white shadow-md w-[90%] sm:w-auto'
            style={{
              top: `${popupPosition.top}px`,
              left: '5%', // Center the popup horizontally on mobile
            }}
          >
            <AssigneeSelector />
          </div>
        )}
      </div>

      {/* Transaction Information Section */}
      <div className='mt-4 border-t pt-3'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-base font-bold text-gray-800'>
            Transaction Information
          </span>
          <span className='material-icons text-gray-500 cursor-pointer'>
            <img src='/setting.svg' className='w-4 h-4' alt='' />
          </span>
        </div>

        {/* Navigation Links with conditional active styling */}
        <ul className='space-y-2'>
          {menuItems.map(item => (
            <li
              key={item.name}
              className={`px-2 py-1 rounded-md cursor-pointer flex justify-between items-center ${
                selectedOption === item.name
                  ? '!bg-[#E0E0E0] text-[#9094A5] font-medium'
                  : 'hover:bg-gray-100 text-gray-400'
              }`}
              onClick={() => setSelectedOption(item.name)}
            >
              {item.name}
              {item.hasBadge && (
                <span className='text-sm text-[#9094A5] bg-white border border-[#9094A5] px-2 py-0.5 rounded-full'>
                  {item.count}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideSection;
