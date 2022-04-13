import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerTitle">
        <span>A community that learns together.</span>
      </div>
      <div className="more">
        <ul>
          <li>
            <span>Article License</span>
            <span>Terms and Conditions</span>
            <span>Privacy Policy</span>
            <span>Contact Form</span>
            <span>The Book</span>
          </li>
        </ul>
      </div>
      <div className="policy">
        <p className="copyright">
          Copyright © 2020 Zine EOOD. All Rights Reserved.
        </p>
      </div>
      <div className="social">
        <ul>
          <li><i className="fab fa-facebook-f"></i></li>
          <li><i className="fab fa-twitter"></i></li>
          <li><i className="fab fa-github"></i></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
