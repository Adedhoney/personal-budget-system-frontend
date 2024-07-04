import React, { useState, useEffect } from "react"
import axios from "axios"
import { Record } from "../shared/redux/Slices"
import RecordForm from "./RecordForm"
import RecordList from "./RecordList"
import MonthlyChart from "./MonthlyChart"

const Dashboard: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "http://localhost:3000/records",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            setRecords(response.data)
        }
        fetchData()
    }, [])

    const addRecord = async (
        record: Omit<Record, "_id">
    ) => {
        const response = await axios.post(
            "http://localhost:3000/records",
            record,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        setRecords([...records, response.data])
    }

    const editRecord = async (
        id: string,
        updatedRecord: Omit<Record, "_id">
    ) => {
        const response = await axios.put(
            `http://localhost:3000/records/${id}`,
            updatedRecord,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        setRecords(
            records.map((record) =>
                record.id === id ? response.data : record
            )
        )
    }

    const deleteRecord = async (id: string) => {
        await axios.delete(
            `http://localhost:3000/records/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        setRecords(
            records.filter((record) => record.id !== id)
        )
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <RecordForm addRecord={addRecord} />
            <RecordList
                records={records}
                editRecord={editRecord}
                deleteRecord={deleteRecord}
            />
            <MonthlyChart records={records} />
        </div>
    )
}

export default Dashboard
