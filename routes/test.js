var express = require('express');
var router = express.Router();

const fs = require('node:fs/promises');

app = express();

app.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    let response = {
        textoReal: "Yo es gay"
    }

    res.render("test")
});

router.post('/', (req, res, next) => {
    let input = req.body;

    try {
        fs.writeFile('/home/ubuntu/file', JSON.stringify(input));
    } catch (err) {
        throw err;
    }
});

module.exports = router;
