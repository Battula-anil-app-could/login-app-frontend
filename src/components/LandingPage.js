import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>My MERN App</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <main className="landing-main">
        <h2>Welcome to Our Service</h2>
        <p>Your success starts here.</p>
      </main>
      <footer className="landing-footer">
        <p>&copy; 2024 My MERN App</p>
      </footer>
    </div>
  );
};

export default LandingPage;
