import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo-text">AutoInsight</h2>
          <p>Vehicle market analytics for Sri Lanka<br/>— pricing, trends & actionable insights.</p>
          <div className="social-icons">
            <span className="icon-circle">📷</span> 
            <span className="icon-circle">📘</span>
            <span className="icon-circle">💼</span>
          </div>
          <a href="mailto:info.autoinsight@gmail.com" className="footer-email">info.autoinsight@gmail.com</a>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>PRODUCT</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>RESOURCES</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Data Sources</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Legal</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <button className="float-btn up-btn" onClick={() => window.scrollTo(0,0)}>↑</button>
        <button className="float-btn chat-btn">💬</button>
      </div>
    </footer>
  );
};

export default Footer;