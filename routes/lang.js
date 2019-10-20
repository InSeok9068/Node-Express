var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('lang')
});

router.post('/', function(req, res, next) {
    res.render('lang', {result : "test"})
});

module.exports = router;