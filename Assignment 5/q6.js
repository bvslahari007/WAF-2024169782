// Route-Specific Middleware
// Create an ExpressJS application with authentication middleware. The middleware should check
// whether the request contains a query parameter:
// \?role=admin
// If the role is admin, allow access to /dashboard. Otherwise, return:
// Access Denied
// Also create a /home route that is accessible without authentication.

const express = require("express");
const app = express();

function authenticate(req, res, next) {
  if (req.query.role === "admin") {
    next();
  } else {
    res.status(403).send("Access denied");
  }
}

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/dashboard", authenticate, (req, res) => {
  res.send("<h1>Welcome to the dashboard</h1>");
});

app.use((req, res) => {
  res.status(404).send("<h1> Not found</h1>");
});

app.listen(3000, (req, res) => {
  console.log("Express running successfully");
});
