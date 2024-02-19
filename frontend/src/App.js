import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from './components/Navbar';

const App = () => {

  return (
   <Router>
     <div>
      <Navbar />
     </div>
   </Router>
  );
}

export default App;
