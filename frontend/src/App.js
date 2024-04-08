// Author - Abhinav Acharya Tirumala Vinjamuri
import React from 'react';
import './stylesheets/App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './util';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer.js';
import ComingSoon from './components/ComingSoon';
import { LateFeeSystemSearch, LateFeeSystemUserDetails, LateFeeDetails } from './components/LateFeeSystem';
import Home from './components/home/Home';
import About from './components/Details/About';
import Contact from './components/Details/ContactUs';
import Faq from './components/Details/Faq';
import Favorites from './components/Favorites/Favorites';
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
import UpdateBook from './components/BookManagement/UpdateBook.js';
import ManageBookReservations from './components/BookManagement/ManageBookReservations.js';
import CartComp from './components/Cart/cart.js';
import {localStorageUtil} from './util';
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(localStorageUtil.getItem('user') || null);
  return (
    <div className="App flex flex-column h-screen">
      {/* <div> */}
        <Navbar user={user} setUser={setUser}/>
      {/* </div> */}
      <div className='flex-1'>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookLibrary />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path='/book/:bookId' element={<BookDetail />} />
            <Route path="/Recommended" exact element={<Recommended />} />
            <Route path="/latefee" element={isAuthenticated() ? (isAdmin() ? <LateFeeSystemSearch /> : <LateFeeDetails />) : <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/latefee/details" element={(isAuthenticated() && isAdmin()) ? <LateFeeSystemUserDetails /> : <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={(isAuthenticated()) ? <Profile /> : <Login user={user} setUser={setUser}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={isAuthenticated() ? (<Profile />): <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/forgetps" element={<ForgetPasswordEmail />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/cartdetails" element={isAuthenticated() ? <CartComp />: <Navigate to="/login"/>} />
            <Route path="/manage-books" element={(isAuthenticated() && isAdmin()) ? <BookManager /> : <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/add-book" element={(isAuthenticated() && isAdmin()) ? <AddBook /> : <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/update-book/:bookId" element={(isAuthenticated() && isAdmin()) ? <UpdateBook /> : <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/manage-reservations" element={(isAuthenticated() && isAdmin()) ? <ManageBookReservations />: <Navigate to="/login" /*replace="true"*/ />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
          </Routes>
        </Router>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
}

export default App;

