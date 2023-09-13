import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import { AnonymousRoute } from '../components/Routes/AnonymousRoute';
import { PrivateRoute } from '../components/Routes/PrivateRoute';
import AddContact from './AddContact';
import LandingPage from './LandingPage';
import Login from './Login';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
      <Route path="/add-contact" element={<PrivateRoute><AddContact /></PrivateRoute>} />
      <Route path="/login" element={<AnonymousRoute><Login /></AnonymousRoute>} />
    </Routes>
  )
}

export default Pages;
