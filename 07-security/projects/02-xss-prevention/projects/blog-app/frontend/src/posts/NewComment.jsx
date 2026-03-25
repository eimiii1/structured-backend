import { useState } from "react";
import { useParams } from "react-router-dom";

const NewComment = () => {
    const { id } = useParams()
    const [text, setText] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:3000/user/post/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text })
            })
            if (!response.ok) {
                throw new Error(`Failed to add comment.`)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
        >
        <input 
        placeholder="Enter your comment..."
        className="border p-5"
        value={text}
        onChange={e => setText(e.target.value)}
        />
        <button
        className="border bg-black text-white p-2 rounded-full"
        >Comment</button>
        </form>
    )
}

export default NewComment