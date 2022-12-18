import React from 'react';

import { BiPhone } from 'react-icons/bi';
import { FiMail, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className="footer text-white bg-dark text-center">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">Luxe</span>
            <span className="footer-sub">hotel booking</span>
            <div className="mt-3 footer-icons">
              <a href="https://www.instagram.com/">
                <FiInstagram />
              </a>
              <a href="https://www.facebook.com/">
                <FiFacebook className="ms-2" />
              </a>
              <a href="https://www.twitter.com/">
                <FiTwitter className="ms-2" />
              </a>
            </div>
          </div>
          <div>
            <div>
              <h5 className="text-white ">Contact Us:</h5>
            </div>
            <div className="text-muted">
              <BiPhone /> 041757071
            </div>
            <div className="text-muted">
              <FiMail /> book@luxe.co
            </div>
          </div>
          <div className='footer-cert'>
            <img
              decoding="async"
              loading="lazy"
              width="213"
              height="90"
              src="https://a6e8z9v6.stackpathcdn.com/hotale/resort/wp-content/uploads/sites/2/2021/11/footer-banner.png"
              alt="footer"
            />
          </div>
        </div>
        <div className="text-muted">
          www.luxe-booking.com
          <p> Copyright © Niloofar | All Rights Reserved!</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
