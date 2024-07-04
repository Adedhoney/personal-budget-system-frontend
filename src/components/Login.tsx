import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doLogin } from "../shared/apicall"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await doLogin({ email, password })
            navigate("/dashboard")
        } catch (error) {
            console.error("Login error:", error)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
