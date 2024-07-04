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
        <div>
            <h2>Dashboard</h2>
            <label>
                <input
                    type="checkbox"
                    checked={isFormOpen}
                    onChange={handleToggle}
                />
                {isFormOpen ? 'Close Form' : 'Open Form'}
            </label>
            {isFormOpen && <RecordForm />}
            <MonthlyChart />
            <RecordList />
        </div>
    );
};

export default Dashboard;
