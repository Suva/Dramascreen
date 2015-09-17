var express = require('express');
var router = express.Router();
var msg = require("./messages");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/msg', function(req, res, next) {
    console.log(req.body);
    msg.sendMessage(req.body.title, req.body.message);
    res.send("OK");
});


module.exports = router;
