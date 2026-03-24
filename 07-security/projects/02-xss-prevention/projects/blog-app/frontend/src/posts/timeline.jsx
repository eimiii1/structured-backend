import { useEffect } from "react";
import { useState } from "react";

const Timeline = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

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
        className="h-screen w-screen gap-20 flex justify-center items-center p-20"
        >
            {Object.keys(data.posts).map((key, i) => {
                const { title, content } = data.posts[key]
                return (
                    <div 
                    className="border flex flex-col w-[50em]"
                    key={i}
                    >
                        <span
                        className="text-xl p-2"
                        >{title}</span>
                        <hr />
                        <span
                        className="p-2"
                        >{content}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Timeline;