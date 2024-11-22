import axios from 'axios';
import { useEffect } from 'react';


const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});



export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const forgotPassword = (data) => API.post('/forgotPassword', data);
export const verifyOTP = (data) => API.post('/verifyOTP', data);
export const resetPassword = (data) => API.post('/resetPassword', data);

// dashboard data api
// export const fetchCandidates = () => API.get('/applications');
// export const fetchEvents = () => API.get('/events');
export const deleteEvent = (eventId) => API.delete(`/events/${eventId}`);


export const fetchCandidates = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Unauthorized: No token provided");
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



export default API;
