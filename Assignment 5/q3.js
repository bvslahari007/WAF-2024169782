const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Express.js!");
});

app.get("/about", (req, res) => {
  res.send("<h1>NodeJS Laboratory</h1>");
});

app.use((req, res) => {
  res.send("<h1>404 Not Found</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
