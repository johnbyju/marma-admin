import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});




export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const forgotPassword = (data) => API.post('/forgotPassword', data);
export const verifyOTP = (data) => API.post('/verifyOTP', data);
export const resetPassword = (data) => API.post('/resetPassword', data);


// Sorted Ascending Descending 
// export const SortCandidate = (sortOrder = 'asc') => { API.get(`/applications?sort=${sortOrder}`,{

//     const token = localStorage.getItem("token");
//     if (!token) {
//         console.error("No token found in localStorage");
//         throw new Error("Unauthorized: No token provided");
      
//     }
//         try{

//         }


//         headers: {
//             Authorization: `Bearer ${token}`, 
//         },
        
//     });
//   };

export const SortingCandidate = async (sortOrder = 'asc') => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("Unauthorized: No token provided");
    }
  
    try {
      // Make the GET request with Authorization header and sort query parameter
      const response = await API.get(`/applications?sort=${sortOrder}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Log the response data to the console for debugging
      console.log(response.data, 'Sorted Candidates');
      return response.data; // Ensure the response is returned if you want to use it elsewhere
    } catch (err) {
      // Handle the error and log the response error if available
      if (err.response) {
        console.error(err.response);
      } else {
        console.error('An error occurred', err.message);
      }
    }
  };

  
   
  


  


  

  







// dashboard data api
// export const fetchCandidates = () => API.get('/applications');
// export const fetchEvents = () => API.get('/events');
// export const deleteEvent = (eventId) => API.delete(`/events/${eventId}`);
export const deleteEvent = async (eventId) => {
    
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Unauthorized: No token provided");
      
    }

    console.log("Event ID to delete:", eventId); // Debugging eventId
    console.log("Token:", token); // Debugging token

    try {
        const response = await API.delete(`/event/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ensure proper format
            },
        });
        console.log("Delete Response:", response.data); // Debugging success response
        return response;
    } catch (err) {
        if (err.response) {
            // Log detailed error response
            console.error("Error Response:", err.response.data);
            throw new Error(err.response.data.message || "Delete request failed");
        } else {
            console.error("Error:", err.message);
            throw new Error("An unknown error occurred");
        }
    }
};


export const fetchCandidates = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return <Navigate to="/" replace />;
    }

    try {
        const response = await API.get('/applications', {
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching candidates:", error);
        throw error; // Re-throw the error to handle it in `getData`
    }
};

export const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Unauthorized: No token provided");
    }

    try {
        const response = await API.get('/event/getallevent', {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });     
         return response.data.events
    }
    catch(err){
        console.log(err)
    }
}


// const getData = async () => {
//     try {
//         const candidates = await fetchCandidates();
//         console.log("Data fetched successfully:", candidates);
//     } catch (err) {
//         console.error("Failed to fetch data:", err);
//     }
// };


// getData();
export const PostJobAPi = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Unauthorized: No token provided");
    }

    try {
        const response = await API.post('/jobs',data, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });     
         return response.data.events
    }
    catch(err){
        console.log(err)
    }
}
export const PostEventApi = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Unauthorized: No token provided");
    }

    try {
        const response = await API.post('/eventLink',data, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });     
         return response
    }
    catch(err){
        console.log(err)
    }
}
export default API;
