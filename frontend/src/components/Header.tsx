// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {

  const{ t } = useTranslation();
  return (
    <header>
      <h1>{t('website_name')}</h1>
      <nav>
        <ul>
          <li><Link to="/">{t('home_button')}</Link></li>
          <li><Link to="/about">{t('about_button')}</Link></li>
          <li><Link to="/contact">{t('contact_button')}</Link></li>
          {/* Removed the upload link */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

