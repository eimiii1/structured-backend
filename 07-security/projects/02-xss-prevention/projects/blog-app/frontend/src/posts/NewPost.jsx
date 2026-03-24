import { useState } from 'react'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/user/post', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            })

            if (!response.ok) {
                const errorData = await response.json()
                setError(errorData.message)
            }

            setError(null)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <form className='border p-5' onSubmit={handleSubmit}>
            <h1 className="font-bold text-4xl">New Post</h1>
            <div>
                <div className="flex gap-2">
                    <label className="w-20">Title</label>
                    <input
                        className="border"
                        placeholder="Enter title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="flex gap-2">
                    <label
                        className="w-20"
                    >Content</label>
                    <input
                        className="border"
                        placeholder="Enter content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    ></input>
                </div>
            </div>
            <button
                className="hover:bg-black hover:text-white font-bold w-full border"
                onClick={handleSubmit}
                type="submit"
            >Post</button>
        </form>
    )
}

export default NewPost