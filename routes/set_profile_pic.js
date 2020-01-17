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

router.get('/set_profile_pic', (req, res) => {
    db.query("SELECT * FROM images WHERE username = ?", [req.session.username], (err, succ) => {
        if (err)
            res.send(err);
        else
        {
            res.render("set_profile_pic", {images: succ});
        }
    });
})

module.exports = router;