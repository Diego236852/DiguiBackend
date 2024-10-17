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
        host: "database-diguiapp.ctm0c4k4wncm.us-east-2.rds.amazonaws.com",
        user: "admin",
        password: "DIB45qlce503bc4d9fq5"
    });

    con.connect((err) => {
        if (err) {
            res.send("An error ocurred")
            throw err;
        }
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
