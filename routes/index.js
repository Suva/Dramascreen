var express = require('express');
var router = express.Router();
var msg = require("./messages");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query)
    res.render('index', { theme: req.query.theme });
});

router.get('/client', function(req, res, next) {
    res.render('client');
});

router.post('/message/*', function(req, res, next) {
    var level = getLevel(req);
    var errors = [];

    if(!level) {
        errors.push("Unknown message level");
    }

    if(!((req.body.title && req.body.title.trim() != "") ||
        (req.body.message && req.body.message.trim() != ""))) {
        errors.push("Neither 'message' nor 'title' passed. Please check the post body is JSON object with " +
        "title and/or message properties in it. Also make sure you have included Content-Type header identifying " +
        "the message as application/json.");
    }

    if(errors.length == 0){
        msg.sendMessage(req.body.title, req.body.message, level);
        res.send({result: "OK", success: true});
    } else {
        res.send({result: "ERRORS - " + errors.join("; "), success: false});
    }
});

router.post('/nope/', function(req, res, next) {
    msg.nope();
    res.send({result: "OK", success: true});
});


function getLevel(req) {
    console.log(req.params);
    var level = req.params[0];

    console.log(level);
    if (["error", "warning", "notice", "info"].indexOf(level) < 0) {
        return false;
    }
    return level;
}

module.exports = router;
