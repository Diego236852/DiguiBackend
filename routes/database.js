var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

require('dotenv').config({path:'/home/ubuntu/DiguiBackend/.env'});

const fs = require('node:fs');

app = express();

app.use(express.json());

router.post('/adduser', (req, res) => {
    const { body } = req;

    var con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "digui"
    });

    let email = body.email;

    con.connect((err) => {
        if (err) {
    	    res.send("An error ocurred when connecting");
            throw err;
        }
        let sql = `INSERT INTO Padre (auth) VALUES ('${email}')`;
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when adding USER_ID");
		        throw err;
            }
	        res.send("USER_ID added succesfuly");
	        return;
        });
    });

    res.send("Algo inesperado a sucedido");
});

router.post('/addchild', (req, res) => {
    const { body } = req;

    var con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "digui"
    });

    let email_padre = body.email_padre;
    let nombre = body.nombre;
    let apellido = body.apellido;

    con.connect((err) => {
        if (err) {
            res.send("An error ocurred when connecting");
            throw err;
        }
        let sql = `INSERT INTO Nino (Padre_id, Nombre, Apellido) VALUES ('${email_padre}, ${nombre}, ${apellido}')`
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when creating child");
                throw err;
            }
            res.send("Child created succesfully");
            return;
        });
    });

    res.send("Algo inesperado sucedio");
});

module.exports = router;
