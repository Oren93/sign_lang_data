import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";


const Header = ({ handleLogout }) => {

  const { t } = useTranslation('common');
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1>{t('header.website_name')}</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">{t('header.home_button')}</Link>
          </li>
          <li>
            <Link to="/about">{t('header.about_button')}</Link>
          </li>
          <li>
            <Link to="/contact">{t('header.contact_button')}</Link>
          </li>
          {user ? (
            <>
              <li>{t('header.welcome_message')}{user.username}</li>
              <li>
                <button onClick={handleLogout}>{t('header.logout_button')}</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">{t('header.sign_up_button')}</Link>
              </li>
              <li>
                <Link to="/login">{t('header.login_button')}</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
