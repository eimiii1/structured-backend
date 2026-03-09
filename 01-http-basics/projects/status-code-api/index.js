const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  const method = "GET";

  const routes = [
    { route: "/success", status: 200, message: "OK - Request was successful" },
    { route: "/created", status: 201, message: "Created - Resource was created" },
    { route: "/not-found", status: 404, message: "Not Found - Request does not exist" },
    { route: "/unauthorized", status: 401, message: "Unauthorized - Authentication required" },
    { route: "/forbidden", status: 403, message: "Forbidden - You dont have permission" },
    { route: "/server-error", status: 500, message: "Internal Server Error - Something broke on the server" },
  ];

  const matched = routes.find(({route}) => route === req.url && req.method === method)

  if (matched) {
    res.writeHead(matched.status, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify({status: matched.status, message: matched.message}))
  } else {
    res.writeHead(404, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify({status: 404, message: "Not Found - Request does not exist"}))
  }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})