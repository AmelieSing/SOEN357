// Profile.js

import ChatUnclickedIcon from './CSS/images/chat_unclicked.svg';
import SendUnclickedIcon from './CSS/images/send_unclicked.svg';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import './CSS/profile.css';  // Import the CSS file directly
import BtnWithoutIcon from './LogoutButton';
import "./CSS/chat-box.css";
import profilePic from './CSS/images/profile_pic.jpg';


export const ChatUnclicked = ({ onChatClick }) => {
  return (
    <div className="chat-unclicked" onClick={onChatClick}>
      <img className="vector" alt="Vector" src={ChatUnclickedIcon} />
    </div>
  );
};
export const SendUnclicked = ({ onShareClick }) => {
  return (
    <div className="send-unclicked" onClick={onShareClick}>
      <img className="vector" alt="Vector" src={SendUnclickedIcon} />
    </div>
  );
};

export const ChatBox = ({ onClose }) => {
  return (
    <div className="chat-box">
      <div className="header">
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="content">
        {/* Your chat content goes here */}
      </div>
    </div>
  );
};

const Header = () => null;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [popupVisible, setBoxVisible] = useState(false);


  const handleChatClick = () => {
    setBoxVisible((prev) => !prev);
  };

  const closePopup = () => {
    setBoxVisible(false);
  };




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
     <title>Your Profile - Engage Concordia</title>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <Navbar />
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
                      <ChatUnclicked onChatClick={handleChatClick} />
                      <SendUnclicked className="send-unclicked" />
                    </div>
                    {popupVisible && <ChatBox onClose={closePopup} />} {/* Add this line */}
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
                    <ChatUnclicked onChatClick={handleChatClick}/>
                      <SendUnclicked className="send-unclicked" />
                    </div>
                    {popupVisible && <ChatBox onClose={closePopup} />} {/* Add this line */}
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
                    <ChatUnclicked onChatClick={handleChatClick} />
                      <SendUnclicked variant="filled" />
                    </div>
                    {popupVisible && <ChatBox onClose={closePopup} />} {/* Add this line */}
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
        <div className="text-wrapper-9 ">My Events</div>
      </div>
      <div className="user-information">
        <div className="avatar">
          <img className="img" alt="Ellipse" src={profilePic} />
          <div className="group-3">
            <div className="text-wrapper-10">{user.user.name}</div>
            <div className="bachelor-of-computer">{user.Field}</div>
          </div>
        </div>
        <div className="biography">
          <div className="overlap-group">
          <p className="i-am-enthusiastic-in">{user.bio}</p>
          </div>
        </div>
        </div>

        <BtnWithoutIcon
          onClick={handleLogout}
          text="LOG OUT"
          className="logout-button-text"
          frameClassName="btn-log-out"
        />
            </div>


  );
};
export default Profile;