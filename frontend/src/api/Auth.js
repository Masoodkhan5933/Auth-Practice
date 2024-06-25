import axios from 'axios';


const backendURL = 'https://auth-practice-gb5c.onrender.com/';

// User signup
const signup = async (userData) => {
    try {
        console.log('userData:', userData); // Debugging line
        const response = await axios.post(`${backendURL}/api/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response?.data || error.message); // Enhanced error logging
        throw error;
    }
};

// User login
const login = async (credentials) => {
    try {
        console.log(credentials); // Debugging line
        const response = await axios.post(`${backendURL}/api/auth/signin`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message); // Enhanced error logging
        throw error;
    }
};

export { signup, login };
