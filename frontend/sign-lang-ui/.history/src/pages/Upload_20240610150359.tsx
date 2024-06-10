// src/pages/Upload.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Upload.module.css'; // Import the CSS module
import { useTranslation } from 'react-i18next';

const Upload: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStartRecording = () => {
    navigate('/record');
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2>{t('preparation_warning')}</h2>
        <p>{t('read_prerequisites')}</p>
        <ul>
          <li>{t('pre_req1')}</li>
          <li>{t('pre_req2')}</li>
          <li>{t('pre_req3')}</li>
          <li>{t('pre_req4')}</li>
        </ul>
        <button className={styles.button} onClick={handleStartRecording}>Let's Start!!</button>
      </section>
    </main>
  );
};

export default Upload;
