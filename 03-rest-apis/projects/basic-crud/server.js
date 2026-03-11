const express = require('express')
const app = express();
const PORT = 3000;

app.use(express.json()) // middleware

const users = [];

app.get('/users', (req, res) => {
    res.status(200);
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id; // get id request
    const user_found = users.find(user => user.id === parseInt(id)) // find the user && if user not exist, return 'undefined'

    if (!user_found) {
        res.status(404);
        res.json({ status: 404, message: "User not found." })
        return;
    }

    res.status(200);
    res.send(user_found)
})

app.post('/users', (req, res) => {
    const new_user = { id: users.length + 1, ...req.body }
    users.push(new_user)
    res.status(201);
    res.json({ status: 201, message: "User Added.", user: { id: new_user.id, name: new_user.name, age: new_user.age } })
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user_found = users.find(user => user.id === parseInt(id))

    if (!user_found) {
        res.status(404);
        res.json({ status: 404, message: "User not found." })
        return;
    }

    Object.assign(user_found, req.body)
    res.status(200)
    res.json({ status: 200, message: "User updated." })
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const user_found = users.findIndex(user => user.id === parseInt(id))

    if (user_found === -1) {
        res.status(404)
        res.json({status: 404, message: "User not found."})
        return;
    }
    
    users.splice(user_found, 1);
    res.status(200)
    res.json({status: 200, message: "User deleted."})
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})