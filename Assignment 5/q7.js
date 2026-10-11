let students = [
  { id: 1, name: "Lahari", age: 19 },
  { id: 2, name: "Atreyi", age: 19 },
];

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.json(student);
});

app.post("/students", (req, res) => {
  const newId = students.length + 1;
  const newStud = {
    id: newId,
    name: req.body.name,
    age: req.body.age,
  };
  students.push(newStud);
  res.status(201).json(newStud);
});

app.listen(3000, (req, res) => {
  console.log("Server is running");
});
