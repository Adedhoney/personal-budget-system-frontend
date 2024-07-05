import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Record } from '../shared/redux';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const MonthlyChart: React.FC = () => {
    const records = useSelector(
        (state: any) => state.record.records as Record[],
    );

    const getMonthlyData = () => {
        const months: Set<string> = new Set();
        const incomeData: { [key: string]: number } = {};
        const expenseData: { [key: string]: number } = {};

        records.forEach((record) => {
            const date = new Date(record.date * 1000);
            const month = `${date.toLocaleString('default', {
                month: 'short',
            })} ${date.getFullYear()}`;
            if (record.category === 'income') {
                incomeData[month] =
                    (Number(incomeData[month]) || 0) + Number(record.amount);
                expenseData[month] = expenseData[month] || 0;
                months.add(month);
            } else {
                expenseData[month] =
                    (Number(expenseData[month]) || 0) + Number(record.amount);
                incomeData[month] = incomeData[month] || 0;

                months.add(month);
            }
        });

        return { incomeData, expenseData, months };
    };

    const { incomeData, expenseData, months } = getMonthlyData();

    const data = {
        labels: Array.from(months),
        datasets: [
            {
                label: 'Income',
                data: Array.from(months).map((value) => {
                    return incomeData[value];
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Expenses',
                data: Array.from(months).map((value) => {
                    return expenseData[value];
                }),
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
