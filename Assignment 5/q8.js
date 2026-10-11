const express = require("express");
const app = express();

let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
  },
  {
    id: 2,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    price: 250,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 399,
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    price: 550,
  },
];

app.use(express.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newId = books.length + 1;
  const newBook = {
    id: newId,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const bb = books.find((s) => s.id === Number(req.params.id));
  if (!bb) {
    return res.status(404).send("NOT FOUND TO UPDATE");
  }
  bb.title = req.body.title;
  bb.author = req.body.author;
  bb.price = req.body.price;
  res.status(200).send(bb);
});

app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }
  const deletedBook = books.splice(index, 1)[0];

  res.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook,
  });
});

app.listen(3000, (req, res) => {
  console.log("Server is running");
});
