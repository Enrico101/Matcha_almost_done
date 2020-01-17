const express = require('express');
var session = require('express-session');
var db = require('../database');
var bodyParser = require('body-parser');
var path = require('path');
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

router.post('/selected_pic', (req, res) => {
    var set = req.body.image;
    var username = req.session.username;
    db.query("UPDATE user_profile SET profile_pic = ? WHERE username = ?", [set, username], (err, succ) => {
        if (err)
            res.send("An error has occured");
        else
        {
            res.redirect('/profile');
        }
    });
});

module.exports = router;