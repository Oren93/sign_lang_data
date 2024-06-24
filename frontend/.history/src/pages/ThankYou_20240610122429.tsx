import React, { CSSProperties } from 'react';

const ThankYou: React.FC = () => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f8f8f8',
    color: '#333',
  };

  const messageBoxStyle: CSSProperties = {
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const h1Style: CSSProperties = {
    marginBottom: '20px',
    color: '#007bff',
  };

  const pStyle: CSSProperties = {
    marginBottom: '10px',
    fontSize: '18px',
  };

  const smileStyle: CSSProperties = {
    fontSize: '50px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={messageBoxStyle}>
        <h1 style={h1Style}>Thank You!</h1>
        <p style={pStyle}>We appreciate your participation in this project.</p>
        <p style={pStyle}>Your contributions are invaluable to us.</p>
        <div style={smileStyle}>😊</div>
      </div>
    </div>
  );
};

export default ThankYou;
