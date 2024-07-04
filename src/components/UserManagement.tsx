import React, { useState, useEffect } from "react"
import {
    adminActivateUser,
    adminDeleteUser,
    adminGetUsers,
    adminMakeUserAdmin,
} from "../shared/apicall"
import { User } from "../shared/redux"

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = async () => {
        try {
            const users = await adminGetUsers()
            if (users) {
                setUsers(users)
            }
        } catch (error) {}
    }

    useEffect(() => {
        fetchUsers
    }, [])

    const activateUser = async (id: string) => {
        try {
            await adminActivateUser(id)
        } catch (error) {}
    }

    const deleteUser = async (id: string) => {
        try {
            await adminDeleteUser(id)
        } catch (error) {}
    }

    const makeAdmin = async (id: string) => {
        try {
            await adminMakeUserAdmin(id)
        } catch (error) {}
    }

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.status}
                        {user.status === "pending" && (
                            <button
                                onClick={() =>
                                    activateUser(user.id!)
                                }
                            >
                                Activate
                            </button>
                        )}
                        {user.role === "user" && (
                            <button
                                onClick={() =>
                                    makeAdmin(user.id!)
                                }
                            >
                                Make Admin
                            </button>
                        )}
                        <button
                            onClick={() =>
                                deleteUser(user.id!)
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
