import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from './auth/Register.jsx'
import Login from './auth/Login.jsx'
import Home from './Home.jsx'
import NewPost from './posts/NewPost.jsx'
import Timeline from './posts/timeline.jsx'
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/timeline' element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
