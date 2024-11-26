import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, LogOut, PlusSquare, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCandidates, fetchEvents } from '../../API/Api';
import Swal from 'sweetalert2';



export default function Dashboard() {
  console.log("check the function");
  const [jobModal, setJobModal] = useState(false)
  const [activeTab, setActiveTab] = useState('Job');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Candidates, setCandidates] = useState([])
  const [Events, setEvents] = useState([])

  const navigate = useNavigate()


  const openModal = () => setJobModal(true)
  const closeModal = () => setJobModal(true)




  // API calling 
  useEffect(() => {

    const fetchData = async () => {
      try {
        if (activeTab === 'Job') {
          const response = await fetchCandidates();
          setCandidates(response.data);
        }
        if (activeTab === 'Event') {
          const response = await fetchEvents();
          console.log("this is my table", response);
          setEvents(response);
        }
      }
      catch (err) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 1500
        });
      };
    }
    fetchData();
  }, [activeTab])

  const handleDelete = (id) => {
    console.log(`Delete item with ID: ${id}`);
    // Add delete functionality here
  };

  const handleViewEvent = (link) => {
    console.log(`View event at: ${link}`);
    // Add view event functionality here
  };

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      timer: 1000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/");
    });
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div>
          <img src="/logob.png" alt="Logo" style={{ width: '130px' }} />
        </div>
        <div className="relative flex items-center" onClick={() => setIsModalOpen((prev) => !prev)}>
          <div className="flex flex-col items-center gap-2 text-sm">
            <span>Mathankumar</span>
            <span className="text-gray-500">HR Manager</span>
          </div>
          <div className="ml-2">
            {isModalOpen ? <ChevronUp /> : <ChevronDown />}
          </div>

          {/* Modal below the profile div */}
          {isModalOpen && (
            <div className="absolute bg-white shadow-lg rounded-md w- mt-32 p-4 " onClick={handleDelete}>
              <div className="flex justify-center items-center flex-col">
                <button className=" text-black flex rounded-md" onClick={handleLogout}>
                  <LogOut className='text-black h-5 ' /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Tabs */}
        <div className='flex justify-between'>
          <div className="flex  mb-8">
            <button
              onClick={() => setActiveTab('Job')}
              className={`px-6 py-2 rounded-s-lg transition-colors duration-200 ${activeTab === 'Job' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              Job
            </button>
            <button
              onClick={() => setActiveTab('Event')}
              className={`px-6 py-2 rounded-e-lg transition-colors duration-200 ${activeTab === 'Event' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              Event
            </button>
          </div>
          <div>
            <button className='flex border rounded-md border-black p-2'>
              <p className='flex gap-2'>{activeTab === 'Job' ? 'Post Job' : 'Add Event'}<PlusSquare /></p>
            </button>
            {isModalOpen && activeTab === 'Job' && (
              <JobModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleJobSubmit}
              />
            )}
            {isModalOpen && activeTab === 'Event' && (
              <EventModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleEventSubmit}
              />
            )}  
          </div>
        </div>


        {/* Table Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">{activeTab === 'Job' ? 'Candidate List' : 'Event List'}</h2>
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

          {/* Dynamic Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  {activeTab === 'Job' ? (
                    <>
                      <th className="px-4 py-3 text-left">Candidate ID</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">applyingDesignation</th>
                      <th className="px-4 py-3 text-left">experience</th>
                      <th className="px-4 py-3 text-left">Current Salary</th>
                      <th className="px-4 py-3 text-left">Expected Salary</th>
                      <th className="px-4 py-3 text-left">Resume</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-left">Event ID</th>
                      <th className="px-4 py-3 text-left">Event Link</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">View</th>
                      <th className="px-4 py-3 text-left">Delete</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'Job'
                  ? Candidates.map((candidate, index) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="px-4 py-3">{candidate.id}</td>
                      <td className="px-4 py-3">{candidate.name}</td>
                      <td className="px-4 py-3">{candidate.email}</td>
                      <td className="px-4 py-3">{candidate.applyingDesignation}</td>
                      <td className="px-4 py-3">{candidate.experience}</td>
                      <td className="px-4 py-3">{candidate.currentsalary}</td>
                      <td className="px-4 py-3">{candidate.expectedsalary}</td>
                      <td className="px-4 py-3">
                        <a href={candidate.resume} target='_blank' rel='noopener noreferrer'></a>
                        View Resume
                      </td>
                    </tr>
                  ))
                  : Events.map((event, index) => (
                    <tr key={event.id} className="hover:bg-gray-50 border-b border-gray-200">
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
  );
}

const JobModal = ({ isOpen, onClose, onSubmit }) => {


  const [formdata, setFormData] = useState({
    role: '',
    department: '',
    employmentType: '',
    description: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formdata)
    onClose()
  }
  if (!isOpen) return null
  return (
    <>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Enter Role"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Department</option>
                <option value="engineering">All</option>
                <option value="design">Development</option>
                <option value="marketing">Design</option>
                <option value="sales">Marketing</option>
                <option value="operations">Human Resourse</option>
              </select>
            </div>
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
                Employment Type
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
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
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter job description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>v
    </>
  )

}


export function AddJobModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    role: '',
    department: '',
    employmentType: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null


}

