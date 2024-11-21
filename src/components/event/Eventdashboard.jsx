import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function EventDashboard() {
  const [activeTab, setActiveTab] = useState('Event')
  const [sortBy, setSortBy] = useState('newest')

  const events = [
    {
      id: '#1101',
      link: 'https://marmafintech.vercel.app/',
      date: '12-11-2024',
    },
    {
      id: '#1101',
      link: 'https://marmafintech.vercel.app/',
      date: '12-11-2024',
    },
    {
      id: '#1101',
      link: 'https://marmafintech.vercel.app/',
      date: '12-11-2024',
    },
    {
      id: '#1101',
      link: 'https://marmafintech.vercel.app/',
      date: '12-11-2024',
    },
    {
      id: '#1101',
      link: 'https://marmafintech.vercel.app/',
      date: '12-11-2024',
    },
    {
      id: '#1101',
      link: 'https://marmafintech.vercel.app/',
      date: '12-11-2024',
    }
  ]

  const handleDelete = (id) => {
    console.log('Delete event:', id)
    // Add delete functionality here
  }

  const handleViewEvent = (link) => {
    console.log('View event:', link)
    // Add view event functionality here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div>
         
            <img src="/logob.png" alt="" style={{width:'80px',height:'40px'}}/>
          
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>Mathankumar</span>
          <span className="text-gray-500">HR manager</span>
        </div>
      </header>

      <main className="p-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('Job')}
            className={`px-6 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'Job' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            Job
          </button>
          <button
            onClick={() => setActiveTab('Event')}
            className={`px-6 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'Event' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            Event
          </button>
          <div className="flex-grow"></div>
          <button className="px-4 py-2 bg-white border rounded-md flex items-center gap-2">
            Add Vacancies
            <span className="text-xl">+</span>
          </button>
        </div>
      {/* Event Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Events</h2>
            <div className="flex gap-4">
              <select 
                className="px-4 py-2 bg-gray-100 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort by</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
              </select>
              <button className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2">
                Filter
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Event ID</th>
                  <th className="px-4 py-3 text-left">Event Link</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Events</th>
                  <th className="px-4 py-3 text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3">{event.id}</td>
                    <td className="px-4 py-3">{event.link}</td>
                    <td className="px-4 py-3">{event.date}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleViewEvent(event.link)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Event
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}