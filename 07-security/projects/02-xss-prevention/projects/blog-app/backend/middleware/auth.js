import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        
        if (!token) {
            res.status(400).json({
                status: 400,
                message: 'No token provided.'
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({
            status: 401,
            message: 'Invalid token.'
        })
    }
}

export default authMiddleware