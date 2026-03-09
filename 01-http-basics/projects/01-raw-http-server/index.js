const http = require('http')

const server = http.createServer((req, res) => {
    if (req.method == 'GET' && req.url == '/user') {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({name: "John", age: 25}))
    }   
})

server.listen(3000, () => {
    console.log("Server running!")
})