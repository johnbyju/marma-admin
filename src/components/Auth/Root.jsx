import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import CreateAccount from './CreateAccount/CreateAccount';
import ForgotPassword from './ForgotPassword/ForgotPassword';


export default function Root() {
  return (
    
      <div className="min-h-screen flex">
        {/* Left side (constant) */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="text-center px-14">
            <img src="/Group.png" alt="Logo" />
          </div>
        </div>

        {/* Right side (dynamic content based on route) */}
        <div className="flex-1 flex items-center justify-center bg-white p-8">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path="/signup" element={<CreateAccount/>} />
          </Routes>
        </div>
      </div>
    
  );
}
