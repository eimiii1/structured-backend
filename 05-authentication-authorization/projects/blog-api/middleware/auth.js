import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization
    if (!authHeaders) return next({status: 404, message: 'No such header is provided.'})

    // if header exists -> extract the authorization token
    const authToken = authHeaders.split(' ')[1] 

    // verify token (jwt verification -> (authToken, secret-key))
    try {
        const token = jwt.verify(authToken, process.env.JWT_SECRET)
        req.user = token
        next()
    } catch (err) {
        next(err)
    }
}

export default authMiddleware