let employees = [
  { id: 1, name: "Lahari", department: "Engineering", salary: 45000 },
  { id: 2, name: "Atreyi", department: "HR", salary: 45000 },
  { id: 3, name: "Aditi", department: "Design", salary: 44000 },
];

const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
});

app.get("/employees", (req, res) => {
  res.status(200).send(employees);
});

app.get("/employees/:id", (req, res) => {
  const re = employees.find((s) => s.id === Number(req.params.id));
  if (!re) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }
  res.json(re);
});

app.post("/employees", (req, res) => {
  const newId = employees.length + 1;
  const newEmp = {
    id: newId,
    name: req.body.name,
    department: req.body.department,
    salary: req.body.salary,
  };
  employees.push(newEmp);
  res.status(201).json(employees);
});

app.use((req, res) => {
  res.status(404).send("REQ NOT FOUND");
});

app.listen(3000, (res, req) => {
  console.log("SERVER IS RUNNING");
});
