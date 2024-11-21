import axios from 'axios';

// Access the environment variable
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Use VITE_ prefix and import.meta.env
});

export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const forgotPassword = (data) => API.post('/forgotPassword', data);
export const verifyOTP = (data) => API.post('/verifyOTP', data);
export const resetPassword = (data) => API.post('/resetPassword', data);

export default API;
