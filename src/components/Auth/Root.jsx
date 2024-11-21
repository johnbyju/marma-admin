import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import Login from './Login/Login';
import CreateAccount from './CreateAccount/CreateAccount';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Candidatedashboard from '../JobList/Joblisting';
import EventDashboard from '../event/Eventdashboard';
import Dashboard from '../JobList/Joblisting';


export default function Root() {

  const location = useLocation();


  const routesWithLayout = ['/', '/signup', '/forgotpassword'];

  const showStaticLayout = routesWithLayout.includes(location.pathname);
  return (
    <>
    {
      showStaticLayout ? (
        <div className="min-h-screen flex">
        {/* Left side (constant) */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="text-center px-14">
            <img src="/Group.png" alt="Logo" />
          </div>
        </div>

        {/* Right side (dynamic content based on route) */}
        <div className="flex-1 flex items-center  bg-white ">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path="/signup" element={<CreateAccount />} />
          </Routes>

        </div>
      </div>
      ) :(
        // after logedin or where client side rendering time these route will not show the static left side logo section
        <Routes>
        <Route path="/candidatelist" element={<Candidatedashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      )
    }
     
    </>



  );
}
