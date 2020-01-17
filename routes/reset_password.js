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

router.get('/reset_password', (req, res) => {
    res.render('reset_password', {username: "", password: ""});
})

router.post('/reset_password', (req, res) => {
    let username = req.body.username;
    let password_check = req.body.password;

    if (username == "")
    {
        res.render('reset_password', {username: "usename field is empty!", password: password_check});
    }
    else if (password_check == "")
    {
        res.render('reset_password', {username: username, password: "Password field is empty!"});
    }
    else
    {
        db.query("UPDATE users set password = ? WHERE username = ?", [password_check, username], (err, succ) => {
            if (err)
                res.send("An error has occured!");
            else
            {
                if (password_check.length > 6)
                {
                    let m1 = password_check.match('[a-z]');
                    let m2 = password_check.match('[A-Z]');
                    let m3 = password_check.match('[0-9]');
                    if (m1 && m2 && m3)
                    {
                        var password = "";
                        res.redirect('/login');
                    }
                    else
                    {
                        var password = "format";
                        res.render('reset_password', {username: "", password: password});
                    }
                }
                else
                    var password = "length";
                    res.render('reset_password', {username: "", password: password});
            }
        })
    }
})
module.exports = router;