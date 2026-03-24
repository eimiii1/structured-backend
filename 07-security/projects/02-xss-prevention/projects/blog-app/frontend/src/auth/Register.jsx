import { useEffect } from "react"
import { useTransition } from "react"
import { useState } from "react"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    const registrationData = {
      username,
      email,
      password
    }
    
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }
      
      const data = await response.json()
      setMessage(data.message || 'Registration successful!')
      setError(null)

    } catch (err) {
      setError(err.message)
      setMessage('')
    }
  }

  return (
    <div className="">
      <form className="border p-10 flex justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <label className="w-10">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border"
            required
          >
          </input>
        </div>
        <div className="flex gap-10">
          <label className="w-10">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border"
            required
          >
          </input>
        </div>
        <div className="flex gap-10">
          <label className="w-10">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border"
            required
          >
          </input>
        </div>
        <button 
          type="submit"
          className="border p-2 hover:bg-black"
        >Register</button>
      </form>
    </div>
  )
}

export default Register