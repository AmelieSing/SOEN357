import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [user, setUserName] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const userId = params.get('userId');
  


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        
        const token = localStorage.getItem('token');
        
       
          const response = await axios.get('http://localhost:5000/api/Auth', {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          });

          if (response.status === 200) {
            setUserName(response.data.name);
          }
        
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleCalendar = () => {
    window.location.href = `/calendar?token=${token}&userId=${userId}`;
    console.log('Going to Calendar Page');
  };

  const handleProfile = () => {
    window.location.href = `/profile?token=${token}&userId=${userId}`;
    console.log('Going to Profile Page');
  };

  var styling = require('./CSS/navbar.css');
  var profilePic = require('./CSS/images/profile_pic.jpg');

  return (
    <div>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <div className='Navbar-container'>
        <button className="calendar-button-container" type="button" onClick={handleCalendar}>
          <div className="calendar-button-text">My Calendar</div>
        </button>
        <div className="app-name">Engage Concordia</div>
        <button className="profile-button-container" type="button" onClick={handleProfile}>
          <div className="profile-button-text">{user.name}</div>
          <img className="profile-pic" src={profilePic} alt="Profile Picture" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;