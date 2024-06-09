// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Import the CSS module

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}><Link to="/">Sign Language Project</Link></h1>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


