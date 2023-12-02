// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './SCSS/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/Auth', {
        email, // Assuming email is the actual username
        password
      });

      if (response.status === 200) {
        const { authToken, userId } = response.data;

        // Store the authentication token in localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userId', userId);

        // Redirect to the profile page

        window.location.href = '/calendar';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div class="container">
      <div class="title-container">
        <div class="title">EngageConcordia</div>
        <link rel="stylesheet" type="text/css" href="login.css"></link>
        <div class="subtitle">Get reminders for events around campus</div>
      </div>

      <div class="form-container">
        <div class="forgot-password">Forgot password?</div>
        <button class="login-button" type="button" onClick={handleLogin}>
          <div class="login-button-text"> LOG IN </div>
        </button>

        <div class="input-container" style={{ marginTop: '77px' }}>
          <input
            class="input-container"
            type="text"
            placeholder="Netname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class="input-container" style={{ marginTop: '161px' }}>
          <input
            class="input-container"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="login-text">Login with your netname</div>
      </div>
    </div>

    // initial code below:
    // <div>
    //   <title className="big-title">Login - Engage Concordia</title>
    //   <link rel="stylesheet" type="text/css" href="login.scss"></link>
    //   <h2>Login</h2>

    //   <div>
    //     <label>
    //       Email:
    // <input
    //   type="text"
    //   value={email}
    //   onChange={(e) => setEmail(e.target.value)}
    // />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Password:
    // <input
    //   type="password"
    //   value={password}
    //   onChange={(e) => setPassword(e.target.value)}
    // />
    //     </label>
    //   </div>
    //   <div>
    // <button type="button" onClick={handleLogin}>
    //   Login
    // </button>
    //   </div>
    // </div>
  );
};

export default Login;
