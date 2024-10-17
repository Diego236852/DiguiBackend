var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
var fs = require('node:fs');
require('dotenv').config({path:'/home/ubuntu/DiguiBackend/.env'});

var router = express.Router();

router.use(cors({origin:'*',credentials: true}));
router.options('*', cors());

router.use(express.json());


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
        let sql = `INSERT INTO Nino (id, Padre_id, Nombre, Apellido) VALUES (NULL, '${email_padre}', '${nombre}', '${apellido}')`
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
