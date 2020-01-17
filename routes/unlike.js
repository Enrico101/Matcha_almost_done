const express = require('express');
var session = require('express-session');
var db = require('../database');
var bodyParser = require('body-parser');
var Objects = require('../objects');
var geo_tools = require('geolocation-utils');

var router = express.Router();
var secretString = Math.floor((Math.random() * 10000) + 1);
router.use(session({
    secret: secretString.toString(),
    resave: false,
    saveUninitialized: false
}));
router.use(bodyParser.urlencoded({
    extended: 'true'
}));

router.post('/unlike', (req, res) => {
    db.query("UPDATE likes SET like_back = ? WHERE username = ? AND likes = ?", [0, req.body.unlike_this_user, req.session.username]);
    db.query("SELECT room_id FROM likes WHERE username = ?", [req.session.username], (err, succ) => {
        if (err)
            res.send("An error has occured!");
        else
        {
            res.redirect("/chat");
        }
    })
})
module.exports = router;