import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Login failed.')
            }

            const data = await response.json()
            localStorage.setItem('token', data.token)
            navigate('/')
            setError(null)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <form className="border flex justify-center p-10 items-center flex-col" onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <div>
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input className="border" type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Password</label>
                        <input type="password" className="border" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button
                    className="border p-2 w-full relative top-5 hover:bg-black hover:text-white"
                    type="submit"
                    >Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login