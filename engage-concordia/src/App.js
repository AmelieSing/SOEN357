import {React,  useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import {LoginPage, Login } from "./pages/LoginPage"
import CalendarPage from "./pages/CalendarPage"
import ProfilePage from "./pages/ProfilePage"
import ErrorPage from "./pages/ErrorPage"
import setAuthToken from './utils/setAuthToken';

//REDUX imports
import { Provider } from 'react-redux';
import store from './store';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {


  return (
    <div className="EngageConcordia">
      <head>
        <title>HTML Elements Reference</title>
      </head>
      <BrowserRouter>
        <Routes>
         <Route index component = {Login}></Route> 
         <Route path ="/login" element = {<LoginPage/>}></Route> 
         <Route path ="/calendar" element = {<CalendarPage/>}></Route> 
         <Route path ="/profile" element = {<ProfilePage/>}></Route> 
         <Route path ="*" element = {<ErrorPage/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
