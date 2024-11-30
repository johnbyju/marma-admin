import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { PostEventApi, fetchEvents } from '../../API/Api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function EventModal({ isOpen, onClose, setEvents }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    link: '',
    date: dayjs(), // Initialize with current date
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, date: newValue }));
  };

  const handleEventChange = async (e) => {
    e.preventDefault();
  
    try {
      const response = await PostEventApi({
        link: formData.link,
        eventDate: formData.date.format('YYYY-MM-DD'), // Change to the expected format
      });
  
      if (response.status === 200 || response.status === 201) {
        onClose();
        Swal.fire({
          title: 'Added Successfully!',
          text: 'The event has been added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        const afterUpdatedEvent = await fetchEvents();
        setEvents(afterUpdatedEvent);
      }
    } catch (error) {
      console.error('Error while posting event:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add the event. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-end p-4 top-36">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Event</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <form onSubmit={handleEventChange} className="space-y-4">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Event Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY" // Display format
                  renderInput={(params) => (
                    <input
                      {...params.inputProps}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black p-2"
                      placeholder="DD/MM/YYYY"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                Event Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="Enter Event Link Here"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                required
              />
            </div>

            <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventModal;
