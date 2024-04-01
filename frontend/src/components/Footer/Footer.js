// Authors - [Arihant Dugar, Abhinav Acharya Tirumala Vinjamuri]
import React from 'react';
import '../../stylesheets/footer.css';

const Footer = () => {
  return (
    <div className="page-footer font-small blue pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5>Book Stack</h5>
            <p>
              Goldberg Computer Science Building<br />
              6050 University Ave,<br />
              Halifax, Nova Scotia<br />
              NS B3H 1W5
            </p>
          </div>
          <hr className="clearfix w-100 d-md-none pb-0" />
          <div className="col-md-6 mb-md-0 mb-3">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/"  className='text-white'>Home</a></li>
              <li><a href="/about" className='text-white'>About Us</a></li>
              <li><a href="/contactus" className='text-white'>Contact us</a></li>
              <li><a href="/faq" className='text-white'>FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">© 2024 Copyright: Book Stack Inc.
      </div>
    </div>
  );
};

export default Footer;