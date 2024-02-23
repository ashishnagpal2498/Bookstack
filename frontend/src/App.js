import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './util';
import Navbar from './components/Navbar';
import { LateFeeSystemSearch, LateFeeSystemUserDetails } from './components/LateFeeSystem/AdminSide';
import Home from './components/Details/Home';
import About from './components/Details/About';
import Contact from './components/Details/ContactUs';


const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/adminLateFeeSystemSearch" element={isAuthenticated() ? <LateFeeSystemSearch /> : <Navigate to="/login" /*replace="true"*/ />} />
        <Route path="/adminLateFeeSystemUserDetails" element={isAuthenticated() ? <LateFeeSystemUserDetails /> : <Navigate to="/login" /*replace="true"*/ />} />
      </Routes>
    </Router>

  );
}

export default App;

