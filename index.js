const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "switchyard.proxy.rlwy.net",
    user: "root",
    password: "zljiQgviesJwdfsNXtEKrsUrifXrVHCU",
    database: "railway",
    port: 26742
});


// Test Route
app.get("/", (req, res) => {
    res.send("API Running Successfully!");
});

// Get Users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

// Register API
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) res.send(err);
        else res.send({ message: "User Registered Successfully!" });
    });
});

// IMPORTANT FIX FOR RENDER
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});
