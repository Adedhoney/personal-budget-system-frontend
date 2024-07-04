import React from "react"

interface Record {
    _id: string
    date: string
    description: string
    category: string
    amount: number
}

interface Props {
    records: Record[]
    editRecord: (
        id: string,
        updatedRecord: Omit<Record, "_id">
    ) => void
    deleteRecord: (id: string) => void
}

const RecordList: React.FC<Props> = ({
    records,
    editRecord,
    deleteRecord,
}) => {
    return (
        <div>
            <h3>Records</h3>
            <ul>
                {records.map((record) => (
                    <li key={record._id}>
                        {record.date} - {record.description}{" "}
                        - {record.category} - $
                        {record.amount}
                        <button
                            onClick={() =>
                                editRecord(
                                    record._id,
                                    record
                                )
                            }
                        >
                            Edit
                        </button>
                        <button
                            onClick={() =>
                                deleteRecord(record._id)
                            }
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecordList
