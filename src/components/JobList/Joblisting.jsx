import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, LogOut, PlusSquare, SlidersHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteEvent, fetchCandidates, fetchEvents } from '../../API/Api';
import Swal from 'sweetalert2';
import JobModal from './JobModal';
import EventModal from './EventModal';



export default function Dashboard() {
  console.log("check the function");
  const [sortBy, setSortBy] = useState('newest');
  const [Candidates, setCandidates] = useState([])
  const [Events, setEvents] = useState([])
  const [activeTab, setActiveTab] = useState('Job');
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [jobModal, setJobModal] = useState(false)
  const [eventModal, setEventModal] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setloading] = useState(false)



  const navigate = useNavigate()


  // API calling 
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
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
      }
      finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [activeTab])





  // Your handleDelete function
  const handleDelete = async (id) => {
    try {
      // Call the delete API
      const response = await deleteEvent(id);
      console.log(response, 'response');

      if (response.status == 200) {
        // Show success alert
        await Swal.fire({
          title: 'Deleted!',
          text: 'The event has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })

        const updatedEvents = await fetchEvents();
        setEvents(updatedEvents)
        console.log(updatedEvents, 'updated events');
      } else {
        // Handle API error
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the event.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      // // Handle exceptions
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'An error occurred while deleting the event.',
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      // });
      // console.error(error);
    }
  };


  const handleViewEvent = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferer')
    }
    else {
      console.error('The Link is not Working')
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate("/", { replace: true });
        preventBackNavigation();
        Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
      }
    });
  };

  const blockBackNavigation = () => {
    window.history.pushState(null, "", window.location.href); // Push the current URL to the history

    // Add a listener to prevent back navigation
    window.addEventListener("popstate", function () {
      window.history.pushState(null, "", window.location.href); // Continuously push the same state
    });
  };

  useEffect(() => {
    blockBackNavigation();

    return () => {
      window.removeEventListener("popstate", blockBackNavigation);
    };
  }, []);


  const OpenModal = (data) => {

    if (data == "Job") {
      setJobModal(true);
    }
    if (data == "Event") {
      setEventModal(true)

    }

  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div>
          <img src="/logob.png" alt="Logo" style={{ width: '130px' }} />
        </div>
        <div className="relative flex items-center" onClick={() => setIsTabOpen((prev) => !prev)}>
          <div className="flex flex-col items-center gap-2 text-sm">
            <span>Mathankumar</span>
            <span className="text-gray-500">HR Manager</span>
          </div>
          <div className="ml-2">
            {isTabOpen ? <ChevronUp /> : <ChevronDown />}
          </div>

          {/* Modal below the profile div */}
          {isTabOpen && (
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
            <button className='flex border rounded-md border-black p-2' onClick={() => OpenModal(activeTab)}>
              <p className='flex gap-2'>{activeTab === 'Job' ? 'Post Job' : 'Add Event'}<PlusSquare /></p>
            </button>
            {activeTab === 'Job' && jobModal && (
              <JobModal
                isOpen={jobModal}
                onClose={() => setJobModal(false)} // Close modal when it is closed
              // className='fixed top-4 right-4'
              />
            )}
            {
              activeTab === 'Event' && eventModal && (
                <EventModal
                  isOpen={eventModal}
                  onClose={() => setEventModal(false)}
                  setEvents={setEvents}
                // onSubmit={handleEventSubmit}
                />
              )
            }
          </div>
        </div>


        {/* Table Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">{activeTab === 'Job' ? 'Candidate List' : 'Event List'}</h2>
            {activeTab === 'Job' && (
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 bg-gray-100 rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort by</option>
                  <option value="Ascending" onClick={() => setSortOrder('asc')}>Ascending</option>
                  <option value="Descending" onClick={() => setSortOrder('desc')}>Descending</option>
                </select>
                <button className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2">
                  Filter
                  {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg> */}
                  <SlidersHorizontal />
                </button>
              </div>
            )}

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
                      <td className="px-4 py-3">{candidate.uuid}</td>
                      <td className="px-4 py-3">{candidate.name}</td>
                      <td className="px-4 py-3">{candidate.email}</td>
                      <td className="px-4 py-3">{candidate.applyingDesignation}</td>
                      <td className="px-4 py-3">{candidate.experience}</td>
                      <td className="px-4 py-3">{candidate.currentsalary}</td>
                      <td className="px-4 py-3">{candidate.expectedsalary}</td>
                      <td className="px-4 py-3">
                        <a href={candidate.resume} target='_blank' rel='noopener noreferrer' className='text-green-700'>
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))
                  : Events.map((event, index) => (
                    <tr key={event.id} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="px-4 py-3">{event.uuid}</td>
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
                          onClick={() => handleDelete(event._id)}
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