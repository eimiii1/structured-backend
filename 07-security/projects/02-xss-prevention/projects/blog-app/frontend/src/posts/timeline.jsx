import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Timeline = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch('http://localhost:3000/timeline')
                if (!response.ok) {
                    const errorData = await response.json()
                    setError(errorData.message)
                }
                const data = await response.json()
                setData(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            }
        }
        fetchdata()
    }, [])
    console.log(data)

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!data || !data.posts) {
        return <div>Loading...</div>
    }

    return (
        <div
        className="gap-20 flex justify-center items-center p-20 flex-col"
        >
            <h1
            className="text-4xl"
            >Timeline</h1>
            {Object.keys(data.posts).map((key, i) => {
                const { title, content, _id } = data.posts[key]
                return (
                    <div 
                    className="border flex flex-col w-[50em]"
                    key={i}
                    >
                        <div className="flex flex-col w-[50em]">
                            <span
                            className="text-xl p-2 font-bold"
                            >{title}</span>
                            <span
                            className="p-2 h-50"
                            >{content}</span>
                        </div>
                        <button
                        className="border p-2 m-3 rounded-full w-30 hover:bg-black hover:text-white"
                        onClick={() => navigate(`/timeline/post/${_id}`)}
                        >View Post</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Timeline;