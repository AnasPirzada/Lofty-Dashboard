// src/App.js

import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css';
import Listing from './Page/Listings/Listings.jsx'; // Correct path for Listings page
import Index from './Page/Steper/index.jsx';

function App() {
  return (
    <Router>
      {/* <NavBar /> NavBar will be rendered on all pages */}
      <Routes>
        {/* <Route path="/" element={<Listing />} /> Define route with element */}
        <Route path='/' element={<Listing />} />{' '}
        <Route path='/listings' element={<Listing />} />{' '}
        <Route path='/StepperSection' element={<Index />} />{' '}
        {/* Route for Listings */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
