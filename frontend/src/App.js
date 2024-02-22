import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from './components/layouts/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/ContactUs';


const App = () => {

  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contactus" element={<Contact />}/>

        
      </Routes>
    </BrowserRouter>

  );
}

export default App;

