import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { UserContext } from "../context/UserContext";

const Header = ({ handleLogout }) => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1>Sign Language Video Recorder</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
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
