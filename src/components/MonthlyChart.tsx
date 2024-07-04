import React from "react"
import { Bar } from "react-chartjs-2"

interface Record {
    date: string
    category: string
    amount: number
}

interface Props {
    records: Record[]
}

const MonthlyChart: React.FC<Props> = ({ records }) => {
    const getMonthlyData = () => {
        const incomeData: { [key: string]: number } = {}
        const expenseData: { [key: string]: number } = {}

        records.forEach((record) => {
            const month = new Date(
                record.date
            ).toLocaleString("default", { month: "short" })
            if (record.category === "income") {
                incomeData[month] =
                    (incomeData[month] || 0) + record.amount
            } else {
                expenseData[month] =
                    (expenseData[month] || 0) +
                    record.amount
            }
        })

        return { incomeData, expenseData }
    }

    const { incomeData, expenseData } = getMonthlyData()

    const data = {
        labels: Object.keys(incomeData),
        datasets: [
            {
                label: "Income",
                data: Object.values(incomeData),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "Expenses",
                data: Object.values(expenseData),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
        ],
    }

    return (
        <div>
            <h3>Monthly Income vs. Expenses</h3>
            <Bar data={data} />
        </div>
    )
}

export default MonthlyChart
