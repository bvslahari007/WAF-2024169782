const http = require("http");
const math = require("./math.js");
const a = 4;
const b = 8;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("<h1>Do some Math Stuff</h1>");
  } else if (req.url === "/add") {
    res.end(math.add(a, b).toString());
  } else if (req.url === "/multiply") {
    res.end(math.multiply(a, b).toString());
  } else {
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
