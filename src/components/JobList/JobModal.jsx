import React, { useState } from 'react';
import { PostJobAPi } from '../../API/Api';

function JobModal({ isOpen, onClose, children,}) {
  if (!isOpen) return null;


  const [formdata, setFormData] = useState({
    jobTitle: '',
    jobType: '',
    jobDescription: '',
    jobCategory:''
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleJobSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formdata)
    PostJobAPi(formdata)
    onClose()
  }
  if (!isOpen) return null
  return (
    <>

      <div className="fixed inset-0 flex items-start justify-end p-4 top-36">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Job</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formdata.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter Role"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="jobCategory"
                name="jobCategory"
                value={formdata.jobCategory}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Department</option>     
                <option value="design">Design</option>
                <option value="marketing">IT</option>
                <option value="sales">Marketing</option>
                <option value="human Resourse">HR</option>
                <option value="accounts">Accountant</option>
              </select>
            </div>
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
                Employment Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formdata.jobType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formdata.jobDescription}
                onChange={handleInputChange}
                placeholder="Enter job description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )

 
}

export default JobModal;