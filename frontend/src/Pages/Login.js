import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/Auth';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await login({ username, password });
            if (response && response.accessToken) {
                // Store the token in local storage
                localStorage.setItem('userToken', response.accessToken);
                alert(`Login successful. Token: ${response.accessToken}`);
                navigate('/rolecheck');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            alert('Login failed');
        }
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Sign up page
                </button>
            </div>

        </div>
    );
}

export default Login;
