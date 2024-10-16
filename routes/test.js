var express = require('express');
var router = express.Router();

app.use(cors());

const fs = require('node:fs');

app = express();

app.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    let response = {
        textoReal: "Yo es gay"
    }

    res.render("test")
});

router.post('/', (req, res) => {
    let input = req.body;

    fs.writeFile('/home/ubuntu/file', JSON.stringify(input), err => {
        if (err) {
            console.error(err);
        } else {
            res.send("Se agrego correctamente");
        }
    });

});

module.exports = router;
