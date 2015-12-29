var express = require('express');
var router = express.Router();
var msg = require("./messages");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/client', function(req, res, next) {
    res.render('client');
});

router.post('/message/*', function(req, res, next) {
    var level = getLevel(req);
    if(level &&
        ((req.body.title && req.body.title.trim() != "") ||
        (req.body.message && req.body.message.trim() != ""))
    ){
        msg.sendMessage(req.body.title, req.body.message, level);
        res.send({result: "OK", success: true});
    } else {
        res.send({result: "FAIL - Unknown level", success: false});
    }
});

router.post('/nope/', function(req, res, next) {
    msg.nope();
    res.send({result: "OK", success: true});
});


function getLevel(req) {
    var level = req.params[0];
    if (["error", "warning", "notice", "info"].indexOf(level) < 0) {
        return false;
    }
    return level;
}

module.exports = router;
