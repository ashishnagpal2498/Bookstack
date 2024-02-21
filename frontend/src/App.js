import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './util';
import Navbar from './components/Navbar';
import { LateFeeSystemSearch, LateFeeSystemUserDetails } from './components/LateFeeSystem/AdminSide';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/adminLateFeeSystemSearch" element={isAuthenticated()?<LateFeeSystemSearch />: <Navigate to="/login" /*replace="true"*/ />} />
        <Route path="/adminLateFeeSystemUserDetails" element={isAuthenticated()?<LateFeeSystemUserDetails />: <Navigate to="/login" /*replace="true"*/ />} />
      </Routes>
    </Router>
  );
}

export default App;
