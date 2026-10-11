const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Us</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Us</h1>");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
