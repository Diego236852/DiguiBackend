var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const fs = require('node:fs');

require('dotenv').config();

app = express();

app.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    var con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    });

    con.connect((err) => {
        if (err) throw err;
        res.send("Connected!!!");
    })
});

router.post('/', (req, res) => {
    const { body } = req;

    fs.writeFile('/home/ubuntu/file', typeof body.user_id, err => {
        if (err) {
            console.error(err);
        } else {
            res.send("Se agrego correctamente");
        }
    });

});

module.exports = router;
