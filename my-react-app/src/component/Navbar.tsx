import React from 'react';
import '../styles/Navbar.css';
import logo from '../images/AutoInsightLogo.png'; 

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className="main-header glass-header">
      <div className="header-content">
        
        {/* Logo Section - Now the main focus */}
        <div className="logo-section">
          <img src={logo} alt="AutoInsight Logo" className="app-logo" />
        </div>
        
        {/* Only keeping the Light/Dark Mode Toggle on the right */}
        <div className="standalone-toggle">
          <label className="switch">
            {/* The checkbox is now directly tied to the darkMode state */}
            <input 
               type="checkbox" 
               checked={darkMode} 
               onChange={() => setDarkMode(!darkMode)} 
            />
            <span className="slider round"></span>
          </label>
        </div>

      </div>
    </header>
  );
};

export default Navbar;