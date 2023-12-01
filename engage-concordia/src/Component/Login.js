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

        window.location.href = '/calendar';
      } else {

        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  var styling =require('./CSS/login.css');
  return (
  <div className='Login_Page'>

    <title>Login - Engage Concordia</title>
    <link rel="stylesheet" type="text/css" href={styling}></link>
    <div class="container">
        <div class="title-container">
            <div class="title">Engage Concordia</div>
            <div class="subtitle">Get reminders for events around campus</div>
        </div>
        <div class="form-container">
          <div class="login-text">Log in with your netname</div>
          
          <div class="email-container" >
            <input
              class="input-background"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div class="password-container" >
            <input
              class="input-background"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div class="login-button">
              <button class="login-button-background" type="button" onClick={handleLogin}>
                <div class="login-button-text">LOG IN</div>
              </button>
          </div>
          <div class="forgot-password">Forgot password?</div>
        </div>
    </div>
    
  </div>
    
  );
};

export default Login;