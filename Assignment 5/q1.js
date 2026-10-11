const http = require("node:http");
const date = new Date();

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello World!</h1>");
  } else if (req.url === "/time") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(new Date().toString());
  } else {
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
