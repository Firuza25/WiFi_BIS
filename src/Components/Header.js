import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WifiOutlined } from '@ant-design/icons';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleWifiClick = () => {
    navigate('/home');
  };

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <WifiOutlined 
        style={{ fontSize: '24px', cursor: 'pointer', color: '#00FF00' }} 
        onClick={handleWifiClick} 
      />
      <Link to="/login">Login</Link> | 
      <Link to="/register">Register</Link> | 
      {user && <Link to="/account">Account</Link>} | 
      {user && (
        <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Header;
