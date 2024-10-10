var express = require('express');
var router = express.Router();

app = express();

app.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    res.send(response);
});

module.exports = router;
