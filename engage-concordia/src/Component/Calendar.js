
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profilePic from './CSS/images/profile_pic.jpg';

const Calendar = () =>{
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const userId = params.get('userId');
  const [user, setUser] = useState(null);


    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = 'http://localhost:5000/api/profile/user/' + userId;
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error during user data fetch:', error);
      }
    };


  

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  

    const handleCalendar = () => {
      window.location.href = `/calendar?token=${token}&userId=${userId}`;
      console.log('Going to Calendar Page');
    };
    const handleProfile = () => {
      window.location.href = `/profile?token=${token}&userId=${userId}`;
      console.log('Going to Profile Page');
    };
 
  var styling =require('./CSS/calendar.css');

  return (
    <div>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <div className='Navbar-container'>
        <button className="calendar-button-container" type="button" onClick={handleCalendar}>
          <div className="calendar-button-text">My Calendar</div>
        </button>
        <div className="app-name">Engage Concordia</div>
        <button className="profile-button-container" type="button" onClick={handleProfile}>
          <div className="profile-button-text">{user.user.name}</div>
          <img className="profile-pic" src={profilePic} alt="Profile Picture" />
        </button>
      </div>
    </div>
  );
}


export default Calendar;