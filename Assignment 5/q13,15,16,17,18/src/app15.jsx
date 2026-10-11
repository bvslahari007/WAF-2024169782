import { useState } from "react";

function Employee({ employee, onEdit }) {
  return (
    <div>
      <h3>{employee.name}</h3>
      <p>Department: {employee.department}</p>
      <p>Salary: ₹{employee.salary}</p>
      <button onClick={() => onEdit(employee)}>Edit</button>
      <hr />
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Lahari", department: "CSE", salary: 45000 },
    { id: 2, name: "Aditi", department: "ECE", salary: 40000 },
  ]);

  const [form, setForm] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const [editId, setEditId] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.department.trim() ||
      form.salary === "" ||
      Number(form.salary) < 0
    ) {
      return;
    }

    if (editId !== null) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editId
            ? { ...emp, ...form, salary: Number(form.salary) }
            : emp,
        ),
      );
    } else {
      const newEmployee = {
        id: employees.length
          ? Math.max(...employees.map((emp) => emp.id)) + 1
          : 1,
        ...form,
        salary: Number(form.salary),
      };

      setEmployees((prev) => [...prev, newEmployee]);
    }

    setForm({ name: "", department: "", salary: "" });
    setEditId(null);
  }

  function handleEdit(employee) {
    setForm({
      name: employee.name,
      department: employee.department,
      salary: String(employee.salary),
    });
    setEditId(employee.id);
  }

  return (
    <div>
      <h1>Employee Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Employee name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <button type="submit">
          {editId !== null ? "Update Employee" : "Add Employee"}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", department: "", salary: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Employee List</h2>

      {employees.map((emp) => (
        <Employee key={emp.id} employee={emp} onEdit={handleEdit} />
      ))}
    </div>
  );
}

export default App;
