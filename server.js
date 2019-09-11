const express = require('express');
const sql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');


var app = express();

//var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (res, rep) => {
    rep.sendFile('index.html', { root: path.join(__dirname, ) });
});
//databse connection details
var myConnection = sql.createConnection({
    server: 'remotemysql.com',
    user: '8WJ7okvchy',
    password: "sgwIt5bLTH",
    database: '8WJ7okvchy',
    connect_timeout = 1000
});
//database connection
myConnection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("SQL Connected");
});
//made database
app.get('/createt', (req, res) => {
    // let s = 'CREATE TABLE Students(id int auto_increment primary key,Sname varchar(45),Marks int)';
    let s = "SET GLOBAL connect_timeout = 28800";
    myConnection.query(s, (err, result) => {
        if (err) throw err;
        res.send("Table created");
    });
});
//made table then inserted data
app.post('/maket', urlencodedParser, (res, rep) => {
    // let s = "CREATE TABLE Students(Id int AUTO_INCREMENT, Sname varchar(100),Marks int,PRIMARY KEY(Id));"
    let name = res.body.name;
    let marks = res.body.marks;
    let value = {
        Sname: name,
        Marks: marks
    };
    let s = "INSERT INTO Students SET ?";
    myConnection.query(s, value, (err, result) => {
        if (err) throw err;

    });
});

//display table with data
app.get('/data', (res, rep) => {
    let s = "SELECT * FROM students";
    let r;
    myConnection.query(s, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        r = result;
    });
    rep.send(r);
});
//port for server
app.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"));