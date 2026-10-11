const express = require("express");
const app = express();

app.use(express.json());

let events = [
  { id: 1, name: "Tech Fest", date: "2026-11-10", venue: "Auditorium" },
  { id: 2, name: "Coding Contest", date: "2026-11-15", venue: "Lab 1" },
];

// GET all events
app.get("/events", (req, res) => {
  res.status(200).json(events);
});

// GET event by ID
app.get("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === Number(req.params.id));

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.status(200).json(event);
});

// POST a new event
app.post("/events", (req, res) => {
  const { name, date, venue } = req.body;

  if (!name || !date || !venue) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const id = events.length ? Math.max(...events.map((e) => e.id)) + 1 : 1;

  const newEvent = { id, name, date, venue };

  events.push(newEvent);

  res.status(201).json(newEvent);
});

// PUT update an event
app.put("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === Number(req.params.id));

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const { name, date, venue } = req.body;

  if (!name || !date || !venue) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  event.name = name;
  event.date = date;
  event.venue = venue;

  res.status(200).json(event);
});

// DELETE an event
app.delete("/events/:id", (req, res) => {
  const index = events.findIndex((e) => e.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const deletedEvent = events.splice(index, 1)[0];

  res.status(200).json({
    message: "Event deleted successfully",
    event: deletedEvent,
  });
});

app.listen(3000, () => {
  console.log("Event API running on port 3000");
});
