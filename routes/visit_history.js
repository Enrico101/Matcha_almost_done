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

router.get('/visit_history', (req, res) => {
    db.query("SELECT * FROM views WHERE visitor = ?", [req.session.username], (err, succ) => {
        if (err)
            res.send("An error has occured!");
        else if (succ.length > 0)
        {
            res.render('visit_history', {data: succ});
        }
        else
            res.render('visit_history', {data: ""});
    });
})

module.exports = router;