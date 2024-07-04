import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Record } from '../shared/redux';

const MonthlyChart: React.FC = () => {
    const records = useSelector(
        (state: any) => state.record.records as Record[],
    );

    const getMonthlyData = () => {
        const incomeData: { [key: string]: number } = {};
        const expenseData: { [key: string]: number } = {};

        records.forEach((record) => {
            const date = new Date(record.date);
            const month = `${date.toLocaleString('default', {
                month: 'short',
            })} ${date.getFullYear()}`;
            if (record.category === 'income') {
                incomeData[month] = (incomeData[month] || 0) + record.amount;
            } else {
                expenseData[month] = (expenseData[month] || 0) + record.amount;
            }
        });

        return { incomeData, expenseData };
    };

    const { incomeData, expenseData } = getMonthlyData();

    const data = {
        labels: Object.keys(incomeData),
        datasets: [
            {
                label: 'Income',
                data: Object.values(incomeData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Expenses',
                data: Object.values(expenseData),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h3>Monthly Income vs. Expenses</h3>
            <Bar data={data} />
        </div>
    );
};

export default MonthlyChart;
