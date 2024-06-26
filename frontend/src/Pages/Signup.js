import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/Auth';

function Signup() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('user'); // Default to 'user'

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'role') {
            setRole(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup({ username, email, password, roles: role });
            alert('Signup successful');
        } catch (error) {
            alert('Signup failed');
        }
    }

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Username</span>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Username"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Email"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Password</span>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Password"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Role</span>
                        <select
                            name="role"
                            value={role}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Sign up
                    </button>
                </form>
                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mt-4"
                >
                    Login Page
                </button>
            </div>
        </div>
    );
}

export default Signup;
