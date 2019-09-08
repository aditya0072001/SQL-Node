const express = require('express');
const sql = require('mysql');

var app = express();

var myConnection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "aditya",
    database: 'Blog'
});

myConnection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("SQL Connected");
});

app.get('/createdb', (req, res) => {
    let s = 'create database Blog';
    myConnection.query(s, (err, result) => {
        if (err) throw err;
        res.send("Databse created");
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));