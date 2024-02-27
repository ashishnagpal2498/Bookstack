import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './util';
import Navbar from './components/Navbar/Navbar.js';
import { LateFeeSystemSearch, LateFeeSystemUserDetails } from './components/LateFeeSystem/AdminSide';
import Home from './components/home/Home';
import About from './components/Details/About';
import Contact from './components/Details/ContactUs';
import Faq from './components/Details/Faq';
import  Favorites  from './components/Favorites/Favorites';
import BookLibrary from './components/Books/BookLibrary';
import BookDetail from './components/Books/BookDetail';
import Recommended from './components/Books/Recommended';
import Login from './components/UserAuth/Login.js';
import Register from './components/UserAuth/Register';
import Profile from './components/UserAuth/Profile';
import { ForgetPasswordEmail } from './components/UserAuth/SendEmailPR.js';
import { ResetPassword } from './components/UserAuth/ResetPassword';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import AddBook from './components/BookManagement/AddBook.js';
import BookManager from './components/BookManagement/BookManager.js';

const App = () => {

  return (
    <>
    <ToastContainer/>
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
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/forgetps" element={<ForgetPasswordEmail />}/>
        <Route path="/resetpassword" element={<ResetPassword />}/>
        <Route path="/manage-books" element={<BookManager />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </Router>
</>
  );
}

export default App;

