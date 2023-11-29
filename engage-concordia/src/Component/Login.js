// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/Auth', {
        email, // Assuming email is the actual username
        password,
      });

      if (response.status === 200) {
        const { authToken, userId } = response.data;
        

        // Store the authentication token in localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userId', userId);
        

        // Redirect to the profile page

        window.location.href = '/profile';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;