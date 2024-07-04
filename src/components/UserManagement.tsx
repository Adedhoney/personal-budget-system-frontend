import React, { useState, useEffect } from "react"
import axios from "axios"

interface User {
    _id: string
    username: string
    active: boolean
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(
                "http://localhost:3000/users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            setUsers(response.data)
        }
        fetchUsers()
    }, [])

    const activateUser = async (id: string) => {
        await axios.put(
            `http://localhost:3000/users/${id}/activate`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        setUsers(
            users.map((user) =>
                user._id === id
                    ? { ...user, active: true }
                    : user
            )
        )
    }

    const deleteUser = async (id: string) => {
        await axios.delete(
            `http://localhost:3000/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                },
            }
        )
        setUsers(users.filter((user) => user._id !== id))
    }

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} -{" "}
                        {user.active
                            ? "Active"
                            : "Inactive"}
                        {!user.active && (
                            <button
                                onClick={() =>
                                    activateUser(user._id)
                                }
                            >
                                Activate
                            </button>
                        )}
                        <button
                            onClick={() =>
                                deleteUser(user._id)
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

export default UserManagement
