import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return next({status: 404, message: 'No token provided.'})
    
    const token = authHeader.split(' ')[1]
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifyToken
        next()
    } catch (err) {
        next(err)
    }
}

export default authMiddleware