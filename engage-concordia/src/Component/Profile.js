// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'

const Profile = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.setItem('authToken', "");
    localStorage.setItem('userId', "");
    

    // Redirect to the profile page

    window.location.href = '/login';
    console.log('Logging out');
    // You may want to add additional logic, such as clearing authentication tokens or session data
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        // Use Axios to make the GET request to the authenticated endpoint
        var url = 'http://localhost:5000/api/profile/user/' + userId;
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

  var styling =require('./CSS/profile.css');

  return (
    <div>
      <title> Your Profile - Engage Concordia</title>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <Navbar/>
      <h2>Profile Page</h2>
      <div>
        <strong>Name:</strong> {user.user.name}
      </div>
      <div>
        <strong>University:</strong> {user.University}
      </div>
      <div>
        <strong>Bio:</strong> {user.bio}
      </div>
      <div>
        <strong>Field:</strong> {user.Field}
      </div>
      <div class="logout-button">
              <button class="logout-button-background" type="button" onClick={handleLogout}>
                <div class="logout-button-text">LOG OUT</div>
              </button>
          </div>
    </div>
  );
};

export default Profile;