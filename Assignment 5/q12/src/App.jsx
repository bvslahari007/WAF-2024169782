import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>INCR</button>
      <button onClick={() => setCount(count - 1)}>DECR</button>
      <button onClick={() => setCount(0)}>RESET</button>
    </div>
  );
}

export default App;
