import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="min-h-screen flex">
       
        <div className="flex-1 flex items-center justify-center bg-white p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-medium text-gray-900">Create Your Account</h1>
              <p className="mt-2 text-center text-xl text-gray-600">Connect with Marma Fintech</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-0"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-lg font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    required
                    placeholder="Enter role"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-0"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    Email id
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-0"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Create Your Password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-0"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Create
              </button>
              <p className="text-center">Already have an account? <Link to='/' className="font-bold">Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
