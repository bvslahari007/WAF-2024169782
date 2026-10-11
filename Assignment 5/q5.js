// ExpressJS Middleware
// Create an ExpressJS application that implements custom middleware to:
// • Display the request method and URL in the console.
// • Record the date and time of each request.
// • Apply the middleware to all routes.
// • Create at least two routes to demonstrate its execution

const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  console.log(new Date());
  next();
});

app.get("/home", (req, res) => {
  res.send("<h1>HELLOOO WORLDDDDD</h1>");
});

app.get("/middleware", (req, res) => {
  res.send("<h1>HELLOOO MIDDLEWARE</h1>");
});

app.use((req, res) => {
  res.status(404).send("<h1>404 NOT FOUND</h1>");
});

app.listen(3000, () => {
  console.log("Server is running");
});
