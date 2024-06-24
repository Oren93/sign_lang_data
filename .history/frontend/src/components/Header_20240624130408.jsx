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
            <Link to="/contact">{t('contact_button')</Link>
          </li>
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
