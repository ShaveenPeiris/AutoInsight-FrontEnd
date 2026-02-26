import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './component/Navbar';
import CarMarketplace from './page/CarMarketplace';
import SearchResults from './page/SearchResults';
import Footer from './component/Footer';
import './styles/App.css'; 

/** Scrolls to top whenever the route changes */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ flex: 1 }}
      >
        <Routes location={location}>
          <Route path="/" element={<CarMarketplace />} />
          <Route path="/results" element={<SearchResults />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  // Default to dark mode to match the professional dark theme
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <div className={`app-layout ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;