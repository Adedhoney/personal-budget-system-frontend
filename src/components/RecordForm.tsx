import React, { useState } from 'react';
import { addRecord } from '../shared/apicall';

const RecordForm: React.FC<{ handleToggle: any }> = (props: any) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('income');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addRecord({
            date: Math.floor(new Date(date).getTime() / 1000),
            description,
            category,
            amount: parseFloat(amount),
        });
        setDate('');
        setDescription('');
        setCategory('income');
        setAmount('');
    };

    return (
        <div>
            <div
                className="record-form-overlay"
                onClick={props.handleToggle}
            ></div>
            <div className="record-form">
                <h3>Add New Record</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-div">
                        <button type="submit" className="form-button">
                            Add New Record
                        </button>
                        <button
                            onClick={props.handleToggle}
                            className="form-button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecordForm;
