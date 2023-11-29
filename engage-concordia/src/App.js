// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import Profile from './Component/Profile';



const App = () => {

  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
<Router>
      <Routes>
        
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

    
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />




      </Routes>
    </Router>
  );
};

export default App;