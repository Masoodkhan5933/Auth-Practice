import axios from 'axios';


const backendURL = 'http://localhost:2000';

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

// Check role
// Check role
const checkRole = async (role) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log('Token:', token); // Debugging line
        const response = await axios.get(`${backendURL}/api/test/${role}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error checking ${role}:`, error.response?.data || error.message); // Enhanced error logging
        throw error;
    }
};

export { signup, login, checkRole };
