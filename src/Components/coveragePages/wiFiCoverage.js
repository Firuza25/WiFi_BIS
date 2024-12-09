import React, { useState } from 'react';

const WiFiCoverage = () => {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [networkName, setNetworkName] = useState('');

  const checkConnection = () => {

    if (navigator.onLine) {

      if (navigator.connection) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        setNetworkName(connection.type === 'wifi' ? connection.effectiveType : 'Wi-Fi');
      }
      setConnectionStatus(`Вы подключены к Wi-Fi: ${networkName}`);
    } else {
      setConnectionStatus('Вам нужно подключиться к интернету.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Проверка подключения к Wi-Fi</h1>
      <button 
        onClick={checkConnection} 
        style={{
          backgroundColor: '#9b4dff', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          fontSize: '1.25rem', 
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(155, 77, 255, 0.8)', 
          transition: 'all 0.3s ease', 
          border: 'none'
        }}
      >
        Проверка подключения
      </button>

      <div style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        {connectionStatus && <p>{connectionStatus}</p>}
      </div>
    </div>
  );
};

export default WiFiCoverage;
