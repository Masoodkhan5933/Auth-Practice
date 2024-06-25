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
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Role:
                    <select name="role" value={role} onChange={handleInputChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </label>
                <br />
                <button type="submit">Sign up</button>
            </form>
            <button onClick={() => navigate('/')}>Login Page</button>
        </div>
    );
}

export default Signup;
