import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import Account from './Components/Account';
import Home from './Components/Home';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={user ? <Account user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;