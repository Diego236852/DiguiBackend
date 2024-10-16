var express = require('express');
var router = express.Router();

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
    res.send(req.json);
});

module.exports = router;
