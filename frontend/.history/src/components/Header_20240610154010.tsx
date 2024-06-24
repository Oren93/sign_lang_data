// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Video Data Collection Portal</h1>
      <nav>
        <ul>
          <li><Link to="/">{t('home_button')}</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {/* Removed the upload link */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
