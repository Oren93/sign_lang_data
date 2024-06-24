import React from 'react';
import styles from './ThankYou.module.css'; // Import the CSS module

const ThankYou: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <h1>Thank You!</h1>
        <p>We appreciate your participation in this project.</p>
        <p>Your contributions are invaluable to us.</p>
        <div className={styles.smile}>😊</div>
      </div>
    </div>
  );
};

export default ThankYou;
