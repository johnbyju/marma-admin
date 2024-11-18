import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex">
        {/* Left side (constant) */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="text-center px-14">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>

        {/* Right side (dynamic content based on route) */}
        <div className="flex-1 flex items-center justify-center bg-white p-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
