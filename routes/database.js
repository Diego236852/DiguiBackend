var express = require('express');
var router = express.Router();

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

    con.connect((err) => {
        if (err) {
            res.send("An error ocurred when connecting")
            throw err;
        }
        let sql = `INSERT INTO Padre (auth) VALUES (${body.user_id})`;
        con.query(sql, (err, result) => {
            if (err) {
                res.send("An error ocurred when trying to insert USER_ID");
                throw err;
            }
            res.send("Se agrego un usuario");
        });
    });
});

module.exports = router;