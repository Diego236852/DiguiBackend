var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
require('dotenv').config({path:'/home/ubuntu/DiguiBackend/.env'});

var router = express.Router();

router.use(cors({origin: true,credentials: true}));
router.options('*', cors());

router.use(express.json());


router.post('/adduser', (req, res) => {
    const { body } = req;

    let con = mysql.createConnection({
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

    let con = mysql.createConnection({
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

        let sql = `CALL Add_child('${email_padre}', '${nombre}', '${apellido}')`
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when creating child");
                throw err;
            }
        });
    });

    res.send("Se creo un hijo exitosamente");
});

router.post('/deletechild', (req, res) => {
    const { body } = req;

    let con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "digui"
    });

    let id = body.child_id;

    con.connect((err) => {
        if (err){
            res.send("An error ocurred when connecting");
            throw err;
        }

        let sql = `DELETE FROM Nino WHERE id = ${id}`;
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when deleting child");
                throw err;
            }
        });
    });

    res.send("Se elimino al nino correctamente");
});

router.get('/getparentschildren', (req, res) => {
    let con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "digui"
    });

    let email_padre = req.query.email_padre;

    con.connect((err) => {
        if (err) {
            res.send("An error ocurred when connecting");
            throw err;
        }
        let sql = `SELECT Nino.id, Nino.Nombre, Nino.Apellido FROM Nino WHERE Nino.Padre_id = "${email_padre}"`;
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when creating child");
                throw err;
            }
            res.send(result);
        });
    });
});

router.post('/aumentvictories', (req, res) => {
    const { body } = req;

    let con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "digui"
    });

    let id_nino = body.id_nino;
    let id_juego = body.id_juego;

    con.connect((err) => {
        if (err) {
            res.send("An error ocurred when connecting");
            throw err;
        }

        let sql = `CALL Aument_victories(${id_nino}, ${id_juego})`
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when aumenting victories");
                throw err;
            }
        });
    });

    res.send("Se aumentaron las victorias exitosamente");
});

router.post('/aumentlosses', (req, res) => {
    const { body } = req;

    let con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "digui"
    });

    let id_nino = body.id_nino;
    let id_juego = body.id_juego;

    con.connect((err) => {
        if (err) {
            res.send("An error ocurred when connecting");
            throw err;
        }

        let sql = `CALL Aument_losses(${id_nino}, ${id_juego})`
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when aumenting losses");
                throw err;
            }
        });
    });

    res.send("Se aumentaron las perdidas exitosamente");
});

module.exports = router;
