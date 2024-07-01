import React from "react";
import "../styles/Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation('common');
  
  return (
    <footer className="footer">
      <p>{t('footer.rights')}</p>
    </footer>
  );
};

export default Footer;
