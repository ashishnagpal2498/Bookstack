import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes,/* Navigate*/ } from 'react-router-dom';
// import { isAuthenticated } from './util';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/home/Home';
import About from './components/Details/About';
import Contact from './components/Details/ContactUs';
import Faq from './components/Details/Faq';
import ComingSoon from './components/ComingSoon';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <div className="App flex flex-column h-screen">
      <Navbar />
      <div className='flex-1'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;

