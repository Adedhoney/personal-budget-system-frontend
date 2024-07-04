import React, { useState } from "react"

interface Props {
    addRecord: (record: {
        date: string
        description: string
        category: string
        amount: number
    }) => void
}

const RecordForm: React.FC<Props> = ({ addRecord }) => {
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("income")
    const [amount, setAmount] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addRecord({
            date,
            description,
            category,
            amount: parseFloat(amount),
        })
        setDate("")
        setDescription("")
        setCategory("income")
        setAmount("")
    }

    return (
        <div>
            <h3>Add New Record</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />
                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                    required
                />
                <button type="submit">Add Record</button>
            </form>
        </div>
    )
}

export default RecordForm
