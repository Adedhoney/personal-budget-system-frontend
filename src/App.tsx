import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

import UserManagement from './components/UserManagement';
import './App.css';
import { setAccessToken, store } from './shared/redux';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    dispatch(setAccessToken(token));
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route
                        path="/user-management"
                        element={<UserManagement />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
