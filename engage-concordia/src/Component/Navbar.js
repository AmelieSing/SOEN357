import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Navbar = () => {

 
  //const user = localStorage.getItem('user');


  const handleCalendar = () => {
    // Redirect to the calendar page
    window.location.href = '/calendar';
    console.log('Going to Calendar Page');
  };

  const handleProfile = () => {
    // Redirect to the profile page
    window.location.href = '/profile';
    console.log('Going to Profile Page');
  };
  

  
  var styling =require('./CSS/navbar.css');
  var profilePic =require('./CSS/images/profile_pic.jpg');
    return(
      <div>
        <link rel="stylesheet" type="text/css" href={styling}></link>
        <div className='Navbar-container'>
          <button className="calendar-button-container" type="button" onClick={handleCalendar}>
            <div className="calendar-button-text">My Calendar</div>
          </button>
          <div className = "app-name">Engage Concordia</div>
          <button className="profile-button-container" type="button" onClick={handleProfile}>
              <div className="profile-button-text">UserName</div>
              <img className="profile-pic"src={profilePic} alt="Profile Picture"/>
          </button>
         
        </div>
        
      </div>
    );
}

export default Navbar;