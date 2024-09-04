import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState('');

 
  const handleSignupClick = () => {
    navigate('/signup'); 
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    try {
   
      const response = await axios.post('https://login-app-backend-hi95.onrender.com/login', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      const data = response.data; 
      console.log(data)
      if (response.status === 200) {
        setMessage(data.message);
        localStorage.setItem('isLoggedIn', true); 
        navigate('/'); 
      } else {
        setMessage(data.message); 
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="auth-button">Login</button>
        <button type="button" onClick={handleSignupClick} className="auth-button">Signup</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
