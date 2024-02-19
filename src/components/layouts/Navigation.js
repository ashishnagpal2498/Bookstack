import React, {useState} from 'react'
import '../../stylesheets/header-nav.css'

export const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
  return (
        <nav className="top-nav">
          <div className="logo">Logo</div>
          <div className={`nav-options ${menuOpen ? 'open' : ''}`}>
            <ul className="menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">Books</a></li>
              <li><a href="#">Favorites</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
            <ul className="menu menu-auth">
              <li><a href="#">Login</a></li>
              <li><a href="#">SignUp</a></li>
              <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Bell"><g data-name="Layer 2" fill="#ffffff" ><g data-name="bell" fill="#ffffff" ><rect width="24" height="24" opacity="0" fill="#ffffff" ></rect><path d="M20.52 15.21l-1.8-1.81V8.94a6.86 6.86 0 0 0-5.82-6.88 6.74 6.74 0 0 0-7.62 6.67v4.67l-1.8 1.81A1.64 1.64 0 0 0 4.64 18H8v.34A3.84 3.84 0 0 0 12 22a3.84 3.84 0 0 0 4-3.66V18h3.36a1.64 1.64 0 0 0 1.16-2.79zM14 18.34A1.88 1.88 0 0 1 12 20a1.88 1.88 0 0 1-2-1.66V18h4zM5.51 16l1.18-1.18a2 2 0 0 0 .59-1.42V8.73A4.73 4.73 0 0 1 8.9 5.17 4.67 4.67 0 0 1 12.64 4a4.86 4.86 0 0 1 4.08 4.9v4.5a2 2 0 0 0 .58 1.42L18.49 16z" fill="#ffffff"></path></g></g></svg></a></li>
            </ul>
            <button className={`cross-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>&#x2715;</button>
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
    );
}
