const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ MySQL NOT connected:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});
app.get("/", (req, res) => {
  res.send("SERVER WORKING");
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/tasks", (req, res) => {
  const { title, description, priority, due_date } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, priority, due_date) VALUES (?, ?, ?, ?)",
    [title, description, priority, due_date],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const { title, description, priority, due_date, completed } = req.body;

  db.query(
    `UPDATE tasks SET 
      title=?, 
      description=?, 
      priority=?, 
      due_date=?, 
      completed=? 
     WHERE id=?`,
    [title, description, priority, due_date, completed, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



