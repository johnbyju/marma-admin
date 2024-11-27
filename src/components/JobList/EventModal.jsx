import axios from 'axios';
import React, { useState } from 'react';
import { PostEventApi, PostJobAPi, fetchEvents } from '../../API/Api';

function EventModal({ isOpen, onClose,updatedEventprops}) {
  if (!isOpen) return null;


  const [formdata, setFormData] = useState({
    link:""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEventChange = async(e) => {
    e.preventDefault();
    const res= await PostEventApi (formdata);

    const getUpdatedEvent = await fetchEvents()
    updatedEventprops(getUpdatedEvent)
    
    onClose()
  }
  return (
    <>
      <div className="fixed top-4 right-4 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
          <form onSubmit={handleEventChange} className="space-y-4">
            
            
           
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                
              </label>
              <textarea
                id="link"
                name="link"
                value={formdata.link}
                onChange={handleInputChange}
                placeholder="Paste Event Link Here"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  )

 
}

export default EventModal;