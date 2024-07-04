import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Record } from '../shared/redux';
import { deleteRecord, updateRecord } from '../shared/apicall';

const RecordList: React.FC = () => {
    const records = useSelector(
        (state: any) => state.record.records as Record[],
    );

    const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
    const [updatedRecord, setUpdatedRecord] = useState<Omit<Record, 'id'>>({
        date: 0,
        description: '',
        category: 'income',
        amount: 0,
    });

    const handleDelete = async (id: string) => {
        await deleteRecord(id);
    };

    const handleEdit = (record: Record) => {
        setEditingRecordId(record.id!);
        setUpdatedRecord({
            date: record.date,
            description: record.description,
            category: record.category,
            amount: record.amount,
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setUpdatedRecord({
            ...updatedRecord,
            [name]: name === 'amount' ? parseFloat(value) : value,
        });
    };

    const handleUpdateRecord = async (id: string) => {
        await updateRecord(updatedRecord, id);
    };

    return (
        <div>
            <h3>Records</h3>
            <ul>
                {records.map((record) => (
                    <li key={record.id}>
                        {editingRecordId === record.id ? (
                            <>
                                <input
                                    type="date"
                                    name="date"
                                    value={updatedRecord.date}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={updatedRecord.description}
                                    onChange={handleInputChange}
                                />
                                <select
                                    name="category"
                                    value={updatedRecord.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                                <input
                                    type="number"
                                    name="amount"
                                    value={updatedRecord.amount}
                                    onChange={handleInputChange}
                                />
                                <button
                                    onClick={() =>
                                        handleUpdateRecord(record.id!)
                                    }
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingRecordId(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {record.date} - {record.description} -{' '}
                                {record.category} - ${record.amount}
                                <button onClick={() => handleEdit(record)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(record.id!)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecordList;
