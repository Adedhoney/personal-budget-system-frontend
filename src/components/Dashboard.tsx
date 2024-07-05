import React, { useState } from 'react';
import RecordForm from './RecordForm';
import RecordList from './RecordList';

import MonthlyChart from './MonthlyChart';

const Dashboard: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleToggle = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            <button
                type="submit"
                className="add-record-button form-button"
                onClick={handleToggle}
            >
                Add Record
            </button>
            {isFormOpen && <RecordForm handleToggle={handleToggle} />}
            <MonthlyChart />
            <RecordList />
        </div>
    );
};

export default Dashboard;
