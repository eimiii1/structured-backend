import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <button 
            className="border p-2 hover:bg-black hover:text-white cursor-pointer"
            onClick={() => navigate('/new-post')}
            >New Post</button>
        </>
    )
}

export default Home