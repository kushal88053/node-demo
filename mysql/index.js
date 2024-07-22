const express = require('express');

const mysql = require('mysql');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

// create connection 
db.connect(err => {

    if (err) {
        throw err;
    }

    console.log('Mysql connection ...');
});

const app = express();

//create Database 
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE NODE";

    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Database Created.... ');
    });
});

// create table ...

app.get('/createtable', (req, res) => {
    let sql = "CREATE TABLE users(id int AUTO_INCREMENT , name VARCHAR(255) , designation VARCHAR(255) , PRIMARY KEY(id))";

    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Tabel created.... ');
    });
});

app.get('/insert', (req, res) => {

    newUser = {

        id: 1,
        name: 'kushal',
        designation: 'student',

    };
    let sql = "INSERT INTO users SET ?";

    db.query(sql, newUser, (err) => {
        if (err) {
            throw err;
        }

        res.send('data  inserted....');
    });
});

app.get('/get', (req, res) => {

    newUser = {

     
        name: 'kushal',
        designation: 'student',

    };

    let sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.send('fetch data successfully....');
        console.log(result);
    });
});

app.get('/get/:id', (req, res) => {


    const { id } = req.params;

    if (!id) {
        res.send('indalid id ....');

    }
    newUser = {

        id: 1,
        name: 'kushal',
        designation: 'student',

    };

    let sql = "SELECT * FROM users where id=" + parseInt(id);

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }


        if (result.length == 0) {
            res.send('indalid id ....');

        }
        else {

            res.send(`fetch data successfully for ${id}....`);
            console.log(result);
        }
    });
});

app.get('/update/:id', (req, res) => {


    const { id } = req.params;

    if (!id) {
        res.send('indalid id ....');

    }

    let newName = 'new name';

    let sql = `UPDATE users SET name = '${newName}' where id=${parseInt(id)}`;

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(`update data successfully for ${id}....`);
        console.log(result.affectedRows);

    });
});

app.get('/delete/:id', (req, res) => {


    const { id } = req.params;

    if (!id) {
        res.send('indalid id ....');

    }

    let newName = 'new name';

    let sql = `DELETE FROM users WHERE id = ${mysql.escape(parseInt(id))}`;

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(`deleted data successfully for ${id}....`);
        console.log(result.affectedRows);

    });
});


app.listen(3000, () => {
    console.log(' Work on 3000 port ..');
});