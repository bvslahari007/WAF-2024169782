const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Lahari", branch: "CSE", semester: 5 },
  { id: 2, name: "Aditi", branch: "ECE", semester: 3 },
];

// GET all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST a student
app.post("/students", (req, res) => {
  const { name, branch, semester } = req.body;

  if (!name || !branch || semester == null) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const id = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const student = { id, name, branch, semester };

  students.push(student);

  res.status(201).json(student);
});

// PUT update student
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, branch, semester } = req.body;

  if (!name || !branch || semester == null) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  student.name = name;
  student.branch = branch;
  student.semester = semester;

  res.status(200).json(student);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

app.listen(3000, () => {
  console.log("Student API running on port 3000");
});
