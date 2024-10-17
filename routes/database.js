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

    let user_id = body.user_id;

    con.connect((err) => {
        if (err) {
	    res.send("An error ocurred when connecting");
            throw err;
	    return;
        }
        let sql = `INSERT INTO Padre (auth) VALUES ('${user_id}')`;
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when adding USER_ID");
		throw err;
		return;
            }
	    res.send("USER_ID added succesfuly");
	    return;
        });
    });

    res.send("Algo inesperado a sucedido");
});

module.exports = router;
