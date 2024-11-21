import React, { useState } from 'react'

export default function Candidatedashboard() {
  const [activeTab, setActiveTab] = useState('Job')
  const [sortBy, setSortBy] = useState('newest')

  // Sample data - in a real app this would come from an API
  const candidates = [
    {
      id: '#1101',
      name: 'Geerthika v',
      role: 'Process Manager',
      applyDate: '12-11-2024',
      department: 'Technical',
      expectedSalary: '10.5 CTC',
      currentSalary: '6.5 CTC'
    },
    // Repeated data for demonstration
    {
      id: '#1101',
      name: 'Geerthika v',
      role: 'Process Manager',
      applyDate: '12-11-2024',
      department: 'Technical',
      expectedSalary: '10.5 CTC',
      currentSalary: '6.5 CTC'
    },
    {
      id: '#1101',
      name: 'Geerthika v',
      role: 'Process Manager',
      applyDate: '12-11-2024',
      department: 'Technical',
      expectedSalary: '10.5 CTC',
      currentSalary: '6.5 CTC'
    },
    {
      id: '#1101',
      name: 'Geerthika v',
      role: 'Process Manager',
      applyDate: '12-11-2024',
      department: 'Technical',
      expectedSalary: '10.5 CTC',
      currentSalary: '6.5 CTC'
    },
    {
      id: '#1101',
      name: 'Geerthika v',
      role: 'Process Manager',
      applyDate: '12-11-2024',
      department: 'Technical',
      expectedSalary: '10.5 CTC',
      currentSalary: '6.5 CTC'
    },
    {
      id: '#1101',
      name: 'Geerthika v',
      role: 'Process Manager',
      applyDate: '12-11-2024',
      department: 'Technical',
      expectedSalary: '10.5 CTC',
      currentSalary: '6.5 CTC'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div className="text-xl font-bold">
            <img src="/logo.png"  className=''  alt="" style={{width:'130px'}}/>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm">
          <span>Mathankumar</span>
          <span className="text-gray-500">HR manager</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Tabs */}
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

        {/* Candidate List Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Candidate list</h2>
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900  text-white">
                <tr className='rounded-lg border border-black'>
                  <th className="px-4 py-3 text-left">Candidate ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Applied Role</th>
                  <th className="px-4 py-3 text-left">Apply Date</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Expected Salary</th>
                  <th className="px-4 py-3 text-left">Current Salary</th>
                  <th className="px-4 py-3 text-left">Resume</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={index} className="rounded-lg hover:bg-gray-50">
                    <td className="px-4 py-3">{candidate.id}</td>
                    <td className="px-4 py-3">{candidate.name}</td>
                    <td className="px-4 py-3">{candidate.role}</td>
                    <td className="px-4 py-3">{candidate.applyDate}</td>
                    <td className="px-4 py-3">{candidate.department}</td>
                    <td className="px-4 py-3">{candidate.expectedSalary}</td>
                    <td className="px-4 py-3">{candidate.currentSalary}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View resume
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