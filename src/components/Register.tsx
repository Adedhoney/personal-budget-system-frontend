import React, { useEffect, useState } from 'react';
import { signUp } from '../shared/apicall';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { errorMessage } from '../shared/alert';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const hasToken = useSelector(
        (state: any) => state.app.accessToken as string,
    );
    useEffect(() => {
        if (hasToken) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            errorMessage(
                'Make sure password and confirm password are the same',
            );
        }
        try {
            await signUp({ username, email, password });

            navigate('/login');
            // should add awaiting animation later and one that will display error
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="">Confirm password</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
