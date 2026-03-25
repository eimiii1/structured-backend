import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import NewComment from "./NewComment"

const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // * fetch post
                const postResponse = await fetch(`http://localhost:3000/post/${id}`)
                if (!postResponse.ok) {
                    throw new Error('Error trying to fetch data from post.')
                }

                const postData = await postResponse.json()
                setPost(postData.post)

                // * fetch post -> comments
                const commentResponse = await fetch(`http://localhost:3000/post/${id}/comments`)
                if (!commentResponse.ok) {
                    throw new Error('Error trying to fetch comments from post.')
                }
                const commentData = await commentResponse.json()
                setComments(commentData.comments)
                setError(null)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (error) {
        return <div>Error</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(post)

    return (
        <div
            className="flex border p-20 w-[50em] justify-center items-center h-auto"
        >
            <div>
            </div>
            <div
                className=" p-10 gap-50 flex flex-col"
            >
                <div>
                    <span
                        className="opacity-50 font-semibold"
                    >
                        posted by {post.userId.username}
                    </span>
                    <h1
                        className="text-xl font-bold"
                    >{post.title}</h1>
                    <p>
                        {post.content}
                    </p>
                </div>
                <div>
                    <NewComment />
                    <h2>Comments</h2>
                    {comments.map(({text, userId}, i) => (
                        <div
                        key={i}
                        >
                            <div
                            className="border p-10 flex flex-col gap-2"
                            >
                                <span className="font-bold text-sm">
                                    {userId.username}
                                </span>
                                <span>
                                    {text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post