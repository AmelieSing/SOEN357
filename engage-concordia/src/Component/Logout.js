// Logout.js
import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.setItem('authToken', "");
    localStorage.setItem('userId', "");
    

    // Redirect to the profile page

    window.location.href = '/login';
    console.log('Logging out');
    // You may want to add additional logic, such as clearing authentication tokens or session data
  };

  return (
    <div>
      <h2>Logout</h2>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
