const express = require('express')
const app = express()
const PORT = 3000;

const SECRET_TOKEN = 'mysecrettoken'

app.use((req, res, next) => {
    console.log(`${req.method} $${req.url} - ${new Date().toISOString()}`)
    next();
})

app.use((req, res, next) => {
    if (req.headers.authorization !== SECRET_TOKEN) {
        res.status(401);
        res.send(JSON.stringify({status: 401, message: "No Authorization."}))
        return;
    }
    next();
})

app.use(express.json());

app.post('/', (req, res) => {
    const new_body = req.body;
    res.json(new_body);
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})