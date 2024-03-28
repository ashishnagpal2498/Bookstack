import React from 'react';
import '../../stylesheets/footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>Contact Us</p>
          <p>FAQ</p>
          <p>Careers</p>
        </div>
        <div className="footer-section">
          <p>LinkedIn</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
        <div className="footer-section">
          <p>Twitter</p>
          <p></p> 
        </div>
      </div>
      <p className='rights'>© 2024 Group 13. All rights reserved.</p>
    </footer>
  );
};

export default Footer;