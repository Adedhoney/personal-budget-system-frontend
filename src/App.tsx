import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"

import { Provider } from "react-redux"
import UserManagement from "./components/UserManagement"
import "./App.css"
import { store } from "./shared/redux"

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={<Login />}
                        />
                        <Route
                            path="/register"
                            element={<Register />}
                        />
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/user-management"
                            element={<UserManagement />}
                        />
                    </Routes>
                </div>
            </Router>
        </Provider>
    )
}

export default App
