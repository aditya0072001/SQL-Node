const express = require('express');
const sql = require('mysql');

var app = express();
//databse connection details
var myConnection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "aditya",
    database: 'Blog'
});
//database connection
myConnection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("SQL Connected");
});
//made database
app.get('/createdb', (req, res) => {
    let s = 'create database Blog';
    myConnection.query(s, (err, result) => {
        if (err) throw err;
        res.send("Databse created");
    });
});
//made table then inserted data
app.get('/maket', (res, rep) => {
    // let s = "CREATE TABLE Students(Id int AUTO_INCREMENT, Sname varchar(100),Marks int,PRIMARY KEY(Id));"
    let value = {
        Sname: 'Random',
        Marks: 78
    };
    let s = "INSERT INTO students SET ?";
    myConnection.query(s, value, (err, result) => {
        if (err) throw err;

    });
});

//display table with data
app.get('/', (res, rep) => {
    let s = "SELECT * FROM students";
    myConnection.query(s, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
});
//port for server
app.listen(3000, () => console.log("Server running on port 3000"));