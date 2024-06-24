import React, { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f8f8f8',
    color: '#333',
  };

  const messageBoxStyle = {
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const h1Style = {
    marginBottom: '20px',
    color: '#007bff',
  };

  const pStyle = {
    marginBottom: '10px',
    fontSize: '18px',
  };

  const smileStyle = {
    fontSize: '50px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={messageBoxStyle}>
        <h1 style={h1Style}>{t('title')}</h1>
        <p style={pStyle}>{t('appreciation')}</p>
        <p style={pStyle}>{t('contribution')}</p>
        <div style={smileStyle}>{t('smile')}</div>
      </div>
    </div>
  );
};

export default ThankYou;