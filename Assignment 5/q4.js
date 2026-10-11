// ExpressJS Routing
// Develop an ExpressJS application with the following routes:
// • GET /students → Display a list of students.
// • GET /students/:id → Display the details of a student based on ID.
// • GET /faculty → Display faculty information.
// • Implement a suitable response for an invalid route.

const express = require("express");
const app = express();

const students = [
  { id: 1, name: "Lahari" },
  { id: 2, name: "Atreyi" },
  { id: 3, name: "Mayukha" },
  { id: 4, name: "Aditi" },
];

const faculty = [
  { id: 1, name: "Dr. J", department: "Computer Science" },
  { id: 2, name: "Dr. K", department: "Mathematics" },
];

app.get("/students", (req, res) => {
  res.send(students);
});

app.get("/students/:id", (req, res) => {
  const sid = parseInt(req.params.id);
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === sid) {
      res.send(students[i].name);
    } else {
      res.send("STUDENT NOT FOUND");
    }
  }
});

app.get("/faculty", (req, res) => {
  res.send(faculty);
});

app.use((req, res) => {
  res.send("404 Not Found");
});

app.listen(3000, () => {
  console.log("Server is running!");
});
