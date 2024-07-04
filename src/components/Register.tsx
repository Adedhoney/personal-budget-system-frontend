import React, { useState } from "react"
import { signUp } from "../shared/apicall"

const Register: React.FC = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] =
        useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signUp({ username, email, password })
            // should add awaiting animation later and one that will display error
        } catch (error) {
            console.error("Registration error:", error)
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    required
                />
                <input
                    type="text"
                    placeholder="email"
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
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
