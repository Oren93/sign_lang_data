// src/pages/Upload.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Upload.module.css'; // Import the CSS module

const Upload: React.FC = () => {
  const navigate = useNavigate();

  const handleStartRecording = () => {
    navigate('/record');
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2>Prepare for Recording</h2>
        <p>Please read the following prerequisites before starting your recording session:</p>
        <ul>
          <li>Ensure you are in a well-lit environment.</li>
          <li>Position the camera so that your hands and face are clearly visible.</li>
          <li>Make sure there are no background noises.</li>
          <li>Familiarize yourself with the words you will be signing.</li>
        </ul>
        <button className={styles.button} onClick={handleStartRecording}>Let's Start!!</button>
      </section>
    </main>
  );
};

export default Upload;




