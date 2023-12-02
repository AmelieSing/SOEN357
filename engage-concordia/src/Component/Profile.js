// Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './CSS/profile.css';  // Import the CSS file directly
import BtnWithoutIcon from './LogoutButton';


// Placeholder components for removed imports
const ChatUnclicked = () => null;
const ChatboxEllipses = () => null;
const Header = () => null;
const PaperPlane = () => null;
const SendUnclicked = () => null;


const Profile = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.setItem('authToken', '');
    localStorage.setItem('userId', '');
    window.location.href = '/login';
    console.log('Logging out');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        const url = 'http://localhost:5000/api/profile/user/' + userId;
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
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
  
var styling = require('./CSS/profile.css');

  return (

  <div className="profile-page">
    <title> Your Profile - Engage Concordia</title>
    <link rel="stylesheet" type="text/css" href={styling}></link>
    <Navbar/>
    
      <Header className="header-instance" ellipse="image.png" />
      <div className="my-events">
        <div className="my-event">
          <div className="group-wrapper">
            <div className="group-2">
              <div className="event-specific">
                <div className="event-details">
                  <div className="right-side-col">
                    <div className="time">
                      <div className="text-wrapper-3">7:00PM - 11:00PM</div>
                    </div>
                    <div className="date">December 9, 2024</div>
                    <div className="actionable">
                      <ChatUnclicked className="chat-unclicked" />
                      <SendUnclicked className="send-unclicked" />
                    </div>
                  </div>
                  <p className="event-description">
                    Don&#39;t miss this last one of 2023!! Live music from Twin City Alpine Echo
                  </p>
                  <div className="status">
                    <div className="text-wrapper-4">10 going</div>
                    <div className="text-wrapper-5">2 not going</div>
                    <div className="text-wrapper-6">18 interested</div>
                  </div>
                </div>
                <div className="event-title-2">Dine &amp; Dance</div>
              </div>
              <div className="event-specific-2">
                <div className="event-details-2">
                  <div className="right-side-col-2">
                    <div className="time">
                      <div className="text-wrapper-3">7:00PM - 10:00PM</div>
                    </div>
                    <div className="date">December 17, 2024</div>
                    <div className="actionable-2">
                      <ChatUnclicked className="chat-unclicked" />
                      <SendUnclicked className="send-unclicked" />
                    </div>
                  </div>
                  <p className="p">
                    Get ready to be swept away by the magic of the holiday season as our area&#39;s talented performers
                    bring this timeless tale to the stage. Join us for a delightful evening of festive cheer!
                  </p>
                  <div className="status-2">
                    <div className="text-wrapper-7">30 going</div>
                    <div className="text-wrapper-5">5 not going</div>
                    <div className="text-wrapper-8">30 interested</div>
                  </div>
                </div>
                <p className="event-title-2">A Christmas Carol - a dramatic reading with musical guest</p>
              </div>
              <div className="event-specific-3">
                <div className="event-details-2">
                  <div className="right-side-col-2">
                    <div className="time">
                      <div className="text-wrapper-3">1:00PM - 4:00PM</div>
                    </div>
                    <div className="date">December 18, 2024</div>
                    <div className="actionable-2">
                      <ChatboxEllipses variant="filled" />
                      <PaperPlane variant="filled" />
                    </div>
                  </div>
                  <p className="p">
                    We&#39;ll be having a snack table, lots of fun Christmas themed activities, Storytime provided by
                    the Webster Library, and of course, visits with Santa!
                  </p>
                  <div className="status-2">
                    <div className="text-wrapper-7">20 going</div>
                    <div className="text-wrapper-5">1 not going</div>
                    <div className="text-wrapper-8">40 interested</div>
                  </div>
                </div>
                <div className="event-title-2">2023 Santa Social</div>
              </div>
            </div>
          </div>
        </div>
        <img className="scrolling" alt="Scrolling" src="scrolling.png" />
      </div>
      <div className="my-events-header">
        <div className="text-wrapper-9">My events</div>
      </div>
      <div className="user-information">
        <div className="avatar">
          <img className="img" alt="Ellipse" src="ellipse-3.png" />
          <div className="group-3">
            <div className="text-wrapper-10">Alex Steeves</div>
            <div className="bachelor-of-computer">
              Bachelor of <br />
              Computer Science
            </div>
          </div>
        </div>
        <div className="biography">
          <div className="overlap-group">
            <p className="i-am-enthusiastic-in">
              I am enthusiastic in organizing events and fundraising initiatives. My passion is creating a positive and
              dynamic atmosphere within Concordia&#39;s student community.
            </p>
          </div>
        </div>
        </div>

        <BtnWithoutIcon
        onClick={handleLogout}
        text="LOG OUT"
        className="logout-button-background"
        frameClassName="logout-button"
      />
    </div>


  );
};
export default Profile;