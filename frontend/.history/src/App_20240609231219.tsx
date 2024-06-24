// src/App.tsx
import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Upload from './pages/Upload';
import Record from './pages/Record'; // Import the new component

const App: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const adjustMainPadding = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
      const mainElement = document.querySelector('main');
      
      if (mainElement) {
        mainElement.style.paddingTop = `${headerHeight}px`;
        mainElement.style.paddingBottom = `${footerHeight}px`;
      }
    };

    // Initial adjustment
    adjustMainPadding();

    // Adjust padding on load and window resize
    window.addEventListener('resize', adjustMainPadding);

    return () => {
      window.removeEventListener('resize', adjustMainPadding);
    };
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/record" element={<Record />} /> {/* Add the new route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
