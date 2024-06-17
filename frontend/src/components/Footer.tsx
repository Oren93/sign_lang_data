// src/components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const{ t } = useTranslation();
  return (
    <footer>
      <p>&copy; {t('rights')}</p>
    </footer>
  );
};

export default Footer;
