import React from "react";

function Student(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Branch: {props.branch}</p>
      <p>Semester: {props.sem}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Student name="Lahari" branch="CSE" sem={5} />
      <Student name="Supraja" branch="ECE" sem={1} />
    </div>
  );
}

export default App;
