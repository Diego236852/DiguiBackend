var express = require('express');
var router = express.Router();

app = express();

app.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    let response = {
        textoReal: "Kevin es gay"
    }

    res.send(response);
});

module.exports = router;
