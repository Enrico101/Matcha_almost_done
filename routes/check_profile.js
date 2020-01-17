const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var db = require('../database');

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

router.get('/check_profile', function(req, res) {
    var username = req.session.username;
    db.query("SELECT * FROM user_profile WHERE username = ?", [username], function(err, results) {
        console.log(results);
        if (results.length > 0)
        {
            res.redirect('/profile');
        }
        else
        {
            res.render('set_profile', {username: username, image: "Image found", info: ""});
        }
    })
});

module.exports = router;