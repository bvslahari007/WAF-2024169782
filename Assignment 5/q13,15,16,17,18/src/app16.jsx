import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

function CourseList() {
  const { selected, setSelected } = useContext(CourseContext);

  const courses = ["Python", "Web Development", "Data Structures"];

  function toggleCourse(course) {
    setSelected((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course],
    );
  }

  return (
    <div>
      <h2>Available Courses</h2>

      {courses.map((course) => (
        <div key={course}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(course)}
              onChange={() => toggleCourse(course)}
            />
            {course}
          </label>
        </div>
      ))}
    </div>
  );
}

function SelectedCourses() {
  const { selected } = useContext(CourseContext);

  return (
    <div>
      <h2>Selected Courses</h2>

      {selected.length === 0 ? (
        <p>No courses selected.</p>
      ) : (
        <ul>
          {selected.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState([]);

  return (
    <CourseContext.Provider value={{ selected, setSelected }}>
      <h1>Course Registration System</h1>
      <CourseList />
      <SelectedCourses />
    </CourseContext.Provider>
  );
}

export default App;
