const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "public", req.url);
  if (req.method === "GET" && req.url) {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: 404, message: "File not found." }));
        return;
      }

      res.writeHead(200);
      res.end(data);
    });
  } else {
    res.writeHead(405, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify({status: 405, message: 'Method not allowed'}))
  }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
