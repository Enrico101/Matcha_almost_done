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

router.post('/verify', function(req, res) {
    db.query("SELECT * FROM admin WHERE username = ?", [req.body.username], (err, succ) => {
        if (err)
        {
            res.redirect('/login');
        }
        else if (succ.length > 0)
        {
            if (req.body.username == succ[0].username && req.body.password == succ[0].password)
            {
                res.redirect('/admin');
            }
            else
            {
                res.redirect('/login');
            }
        }
        else
        {
            db.query("SELECT * FROM users WHERE username = ?", [req.body.username], function(err, results) {
                if (err)
                {
                    res.redirect('/');
                }
                else if (results.length > 0)
                {
                    if (results[0].verified == "true")
                    {
                        if (results[0].username == req.body.username && results[0].password == req.body.password)
                        {
                            req.session.username = req.body.username;
                            db.query("UPDATE user_profile SET status = ? WHERE username = ?", ["online", req.session.username], (err, succ) => {
                                if (err)
                                    res.send("An error has occured!");
                                else
                                    res.redirect('/check_profile');
                            })
                        }
                        else
                        {
                            res.redirect('/login');
                        }
                    }
                    else
                    {
                        res.redirect('/login');
                    }
                }
                else
                {
                    res.redirect('/login');
                }
            });
        }
    })
    
});

module.exports = router;