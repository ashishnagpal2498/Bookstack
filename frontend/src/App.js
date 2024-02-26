import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './util';
import Navbar from './components/Navbar';
import { LateFeeSystemSearch, LateFeeSystemUserDetails } from './components/LateFeeSystem/AdminSide';
import Home from './components/home/Home';
import About from './components/Details/About';
import Contact from './components/Details/ContactUs';
import Faq from './components/Details/Faq';
import  Favorites  from './components/Favorites/Favorites';
import BookLibrary from './components/Books/BookLibrary';
import BookDetail from './components/Books/BookDetail';
import Recommended from './components/Books/Recommended';


const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path ="/books" element={<BookLibrary />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path='/book/:bookId' element={<BookDetail />} />
        <Route path="/Recommended" exact element={<Recommended />} />
        <Route path="/adminLateFeeSystemSearch" element={isAuthenticated() ? <LateFeeSystemSearch /> : <Navigate to="/login" /*replace="true"*/ />} />
        <Route path="/adminLateFeeSystemUserDetails" element={isAuthenticated() ? <LateFeeSystemUserDetails /> : <Navigate to="/login" /*replace="true"*/ />} />
        <Route path="/faq" element={<Faq />}/>
        <Route path="/favorites" element={<Favorites />}/>
      </Routes>
    </Router>

  );
}

export default App;

