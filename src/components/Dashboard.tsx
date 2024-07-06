import React, { useEffect, useState } from 'react';
import RecordForm from './RecordForm';
import { useSelector } from 'react-redux';
import RecordList from './RecordList';

import MonthlyChart from './MonthlyChart';
// import { logout } from '../shared/apicall';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../shared/apicall';

const Dashboard: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    getUser();
    const navigate = useNavigate();
    const hasToken = useSelector(
        (state: any) => state.app.accessToken as string,
    );
    const role = useSelector((state: any) => state.app.role as string);
    console.log('role ' + role);
    useEffect(() => {
        if (!hasToken) {
            navigate('login');
        }
        if (role === 'superAdmin') {
            navigate('user-management');
        }
    }, []);
    const handleToggle = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <>
            {' '}
            <div className="dashboard-container">
                <h2>Dashboard</h2>
                {role !== 'user' || (
                    <button
                        type="submit"
                        className="management-button form-button"
                        onClick={() => {
                            navigate('user-management');
                        }}
                    >
                        User Management
                    </button>
                )}

                <button
                    type="submit"
                    className="add-record-button form-button"
                    onClick={handleToggle}
                >
                    Add Record
                </button>
                {isFormOpen && <RecordForm handleToggle={handleToggle} />}
                <MonthlyChart />
            </div>
            <div className="record-container">
                <RecordList />
            </div>
            <button
                type="submit"
                className="logout"
                onClick={() => {
                    logout();
                }}
            >
                Log out
            </button>
        </>
    );
};

export default Dashboard;
