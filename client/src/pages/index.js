import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import AddContact from './AddContact';
import LandingPage from './LandingPage';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add-contact" element={<AddContact />} />
    </Routes>
  )
}

export default Pages;