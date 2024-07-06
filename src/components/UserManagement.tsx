import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    adminActivateUser,
    adminDeleteUser,
    adminGetUsers,
    adminMakeUserAdmin,
    logout,
} from '../shared/apicall';
import { User } from '../shared/redux';
import { useNavigate } from 'react-router-dom';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    const hasToken = useSelector(
        (state: any) => state.app.accessToken as string,
    );
    const role = useSelector((state: any) => state.app.role as string);
    useEffect(() => {
        if (!hasToken) {
            navigate('/login');
        } else if (role === 'user') {
            navigate('/');
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await adminGetUsers();
            if (users) {
                setUsers(users);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const activateUser = async (id: string) => {
        try {
            await adminActivateUser(id);
            setUsers((users: User[]) => {
                return users.map((user: User) =>
                    user.id !== id ? user : { ...user, status: 'active' },
                );
            });
        } catch (error) {}
    };

    const deleteUser = async (id: string) => {
        try {
            await adminDeleteUser(id);

            setUsers((users: User[]) => {
                return users.filter((user: User) => user.id !== id);
            });
        } catch (error) {}
    };

    const makeAdmin = async (id: string) => {
        try {
            await adminMakeUserAdmin(id);

            setUsers((users: User[]) => {
                return users.map((user: User) =>
                    user.id !== id ? user : { ...user, role: 'admin' },
                );
            });
        } catch (error) {}
    };

    return (
        <>
            <div className="record-container">
                <h2>User Management</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="user-list">
                            <p className="grid-item">{user.username}</p>
                            {user.status === 'pending' ? (
                                <button onClick={() => activateUser(user.id!)}>
                                    Activate
                                </button>
                            ) : (
                                <p>{user.status}</p>
                            )}
                            {user.role === 'user' ? (
                                <button onClick={() => makeAdmin(user.id!)}>
                                    Make Admin
                                </button>
                            ) : (
                                <p>{user.role}</p>
                            )}
                            {user.role === 'user' || user.role === 'admin' ? (
                                <button onClick={() => deleteUser(user.id!)}>
                                    Delete
                                </button>
                            ) : (
                                <button className="greyed-out">Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <button
                type="submit"
                className="logout"
                onClick={() => {
                    logout();
                }}
            >
                Log out
            </button>

            {role !== 'superAdmin' && (
                <button
                    type="submit"
                    className="management-button form-button"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Dashboard
                </button>
            )}
        </>
    );
};

export default UserManagement;
