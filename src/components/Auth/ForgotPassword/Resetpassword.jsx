import { ArrowBigLeft } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

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
      <div className="min-h-screen flex flex-1 justify-center">
        <div className=" flex items-center  bg-white p-4">
          <div className="max-w-md w-full space-y-8">
            <div className="text-start">
              <h1 className="text-5xl font-medium text-gray-900">Forgot Password</h1>
              <p className="mt-2 text-start pl-3 text-xl text-gray-600"> reset your password</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 ">
              <div className="space-y-6">
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
                    className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-0"
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
                    placeholder="Enter The Password"
                    className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-0"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* this down section */}
              <div className='flex flex-col pt-40'>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gray-900 px-4 py-3 text-md  font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Login
                </button>
                <p className="text-center">Don't have an account? <br /> <Link to='/signup' className="font-bold">Create Account</Link></p>
              </div>
            </form>

            <Link className='absolute bottom-2  right-2 flex justify-center'>
              <ArrowBigLeft />
              <p className=' text-center text-md font-medium'><Link to='/'>Return to Login</Link></p>
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword