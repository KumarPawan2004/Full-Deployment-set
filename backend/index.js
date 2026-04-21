const pool = require("./db");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");

const app = express();


app.use(cors());
app.use(express.json());

/* 🔐 SIGNUP */
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(email, password) VALUES($1,$2)",
      [email, hashed]
    );

    res.send("User registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* 🔓 LOGIN */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0)
    return res.status(400).send("User not found");

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid)
    return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user.rows[0].id }, "secret");

  res.json({ token });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});