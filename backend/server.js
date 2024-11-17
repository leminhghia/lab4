const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudfe",
});

// Endpoint to get all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.get("/student/:id", (req, res) => {
    const sql = "SELECT * FROM student WHERE ID = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data); 
    });
});


app.post("/create", upload.single("image"), (req, res) => {
    const image = req.file ? req.file.filename : null;
    const { name, email } = req.body;

    const sql = "INSERT INTO student (`Name`, `Email`, `image`) VALUES (?, ?, ?)";
    const values = [name, email, image];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json({ Status: "Success", data });
    });
});

app.put("/update/:id", upload.single("image"), (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;
    let sql;
    let values;
    if (req.file) {
        const image = req.file.filename;
        sql = "UPDATE student SET `Name` = ?, `Email` = ?, `image` = ? WHERE ID = ?";
        values = [name, email, image, id];
    } else {
        sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
        values = [name, email, id];
    }

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json({ Status: "Success", data });
    });
});

// Delete a student
app.delete("/student/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
