import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import CarMarketplace from './page/CarMarketplace';
import SearchResults from './page/SearchResults';
import Footer from './component/Footer';
import './styles/App.css'; 

const App: React.FC = () => {
  // Default to dark mode to match the professional dark theme
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div className={`app-layout ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CarMarketplace />} />
            <Route path="/results" element={<SearchResults />} />
          </Routes>
        </main>
        
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;