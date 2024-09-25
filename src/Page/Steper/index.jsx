import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import SideSection from './SideSection.jsx';
import Stepper from './Stepper.jsx';

export const Index = () => {
  const [selectedOption, setSelectedOption] = useState('Dates'); // Default to 'Dates'

  return (
    <div>
      <NavBar />
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
        <div className='md:col-span-3'>
          <SideSection
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        </div>
        <div className='md:col-span-9'>
          <Stepper selectedOption={selectedOption} />
        </div>
      </div>
    </div>
  );
};

export default Index;
