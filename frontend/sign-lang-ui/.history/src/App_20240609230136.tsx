// src/App.tsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Upload from './pages/Upload';

const App: React.FC = () => {
  useEffect(() => {
    const adjustMainPadding = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
      const mainElement = document.querySelector('main');
      
      if (mainElement) {
        mainElement.style.paddingTop = `${headerHeight}px`;
        mainElement.style.paddingBottom = `${footerHeight}px`;
      }
    };

    // Adjust padding on load and window resize
    window.onload = adjustMainPadding;
    window.onresize = adjustMainPadding;

    // Initial adjustment
    adjustMainPadding();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', adjustMainPadding);
    };
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
