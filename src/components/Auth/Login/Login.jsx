import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API, { login } from '../../../API/Api';
import Swal from 'sweetalert2';

export default function Login() {

  const navigate =useNavigate();

const [email,Setemail]=useState("");
const [password,Setpassword]=useState("");
const [isLoading,setIsLoading]=useState(false);



  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    try{
      const response = await login({email,password})
     

      if(response.status === 200){
        const token = response.data.token;
        localStorage.setItem("token",token)
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Redierct to Dashborad",
          showConfirmButton: false,
          timer: 1000
        });
          navigate('/candidatelist')
      }
    
    }
    catch(err){
      console.error('Error during login:', err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "email and password invalid",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };



  return (
    <>
      <div className="min-h-screen flex flex-1 px-4">
        <div className=" flex items-center w-full justify-center bg-white p-8">        
          <div className="max-w-md w-full">
            <div className="text-start">
              <h1 className="text-5xl font-medium text-gray-900">Welcome Back..!👋</h1>
              <p className="mt-2 text-start pl-3 text-xl text-gray-600">Login to Continue..</p>
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
                    value={email}
                    onChange={(e)=>Setemail(e.target.value)}
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
                    value={password}
                    onChange={(e)=>Setpassword(e.target.value)}
                  />
                </div>
              </div>
              <p className='m-2 text-end text-md font-medium'><Link to='/forgotpassword'>Forgot Password?</Link></p>
              {/* this down section */}
              <div className='flex flex-col pt-40'>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-gray-900 px-4 py-3 text-md  font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {isLoading?'logging in...':'Login'}
                </button>
                <p className="text-center">Don't  have an account? <br /> <Link to='signup' className="font-bold">Create Account</Link></p>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
