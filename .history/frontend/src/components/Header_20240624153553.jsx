// src/components/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = ({ handleLogout }) => {
  const { t } = useTranslation('common');
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1>{t('website_name')}</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">{t('home_button')}</Link>
          </li>
          <li>
            <Link to="/about">{t('about_button')}</Link>
          </li>
          <li>
            <Link to="/contact">{t('contact_button')}</Link>
          </li>
          {user ? (
            <>
              <li>{t('welcome_message')}{user.username}</li>
              <li>
                <button onClick={handleLogout}>{t('logout_button')}</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">{t('sign_up_button')}</Link>
              </li>
              <li>
                <Link to="/login">{t('login_button')}</Link>
              </li>
            </>
          )}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
