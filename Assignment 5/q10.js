const express = require("express");
const app = express();

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 55000, stock: 10 },
  {
    id: 2,
    name: "Headphones",
    category: "Accessories",
    price: 2000,
    stock: 25,
  },
  { id: 3, name: "Keyboard", category: "Accessories", price: 1500, stock: 15 },
];

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

app.post("/products", (req, res) => {
  const { name, category, price, stock } = req.body;

  if (!name || !category || price == null || stock == null) {
    return res.status(400).json({ message: "All product fields are required" });
  }

  const newId = products.length
    ? Math.max(...products.map((p) => p.id)) + 1
    : 1;

  const newProduct = { id: newId, name, category, price, stock };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, category, price, stock } = req.body;

  if (!name || !category || price == null || stock == null) {
    return res.status(400).json({ message: "All product fields are required" });
  }

  product.name = name;
  product.category = category;
  product.price = price;
  product.stock = stock;

  res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server running!");
});
