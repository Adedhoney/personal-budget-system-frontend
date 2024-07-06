import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../shared/apicall';
import { useSelector } from 'react-redux';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        try {
            await doLogin({ email, password });
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
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
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="alternate-action">
                <p>
                    Don't have an account yet? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
