import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState(["Laptop", "Mouse"]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("Product list has been modified!");
  }, [products]);

  function addProduct() {
    if (name.trim() === "") return;

    setProducts((prev) => [...prev, name.trim()]);
    setName("");
  }

  return (
    <div>
      <h1>Product Management</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      <button onClick={addProduct}>Add Product</button>

      <p>{message}</p>

      <ul>
        {products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
