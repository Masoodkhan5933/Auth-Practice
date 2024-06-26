import React, { useState } from 'react';
import { checkRole } from '../api/Auth';

function RoleCheck() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCheck = async (role) => {
        try {
            const data = await checkRole(role);
            setResult(data);
            setError(null);
        } catch (err) {
            setResult(null);
            setError(`You do not have ${role} access or not logged in.`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center">Role Check</h2>
                <button
                    onClick={() => handleCheck('user')}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    User Check
                </button>
                <button
                    onClick={() => handleCheck('admin')}
                    className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                    Admin Check
                </button>
                <button
                    onClick={() => handleCheck('mod')}
                    className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                >
                    Moderator Check
                </button>
                <button
                    onClick={() => handleCheck('all')}
                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    All Check
                </button>
                {result && (
                    <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md">
                        {JSON.stringify(result)}
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoleCheck;
