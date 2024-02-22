import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from './components/layouts/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/ContactUs';
import Faq from './pages/Faq';


const App = () => {

  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contactus" element={<Contact />}/>
        <Route path="/faq" element={<Faq />}/>

        
      </Routes>
    </BrowserRouter>

  );
}

export default App;

