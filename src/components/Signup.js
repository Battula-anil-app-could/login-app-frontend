import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleLoginClick = () => {
    navigate('/login');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let params = new URLSearchParams();
    params.append("name", name);
    params.append("email", email);
    params.append("password", password);

    try {
      const response = await axios.post('https://login-app-backend-hi95.onrender.com/signup', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      
      const data = response.data;
      console.log(data.message)
      if (response.status === 200) {
        setMessage(data.message);
        navigate('/login'); 
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      setMessage(error.response.data.message);
    }


    setName('');
    setEmail('');
    setPassword('');
  };


  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
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
        <button type="submit" className="auth-button">Signup</button>
        <button type="button" onClick={handleLoginClick} className="auth-button">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
