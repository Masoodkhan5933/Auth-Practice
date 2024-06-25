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

    const handleLogin = () => {
        login({ username, password });
    };
    const navigate = useNavigate();

    return (
        <div>
            <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button type="submit" onClick={() => navigate('/signup')}>Sign up page</button>
        </div>

    );
}

export default Login;