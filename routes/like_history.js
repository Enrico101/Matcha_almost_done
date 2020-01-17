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

router.get('/like_history', (req, res) => {
    db.query("SELECT * FROM likes WHERE likes = ?", [req.session.username], (err, likes) => {
        if (err)
            res.send(err);
        else if (likes.length > 0)
            res.render('like_history', {likes: likes});
        else
            res.render('like_history', {likes: ""});
    })
})

module.exports = router;