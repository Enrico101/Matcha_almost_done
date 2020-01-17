const express = require('express');
var session = require('express-session');
var db = require('../database');
var bodyParser = require('body-parser');

var router = express.Router();
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

router.get('/profile', function(req, res) {
    var username = req.session.username;
    //check if user is ghosted
    db.query("SELECT * FROM ghost_mode WHERE username = ?", [username], (err, succ) => {
        if (err)
            res.send("AN error has occured!");
        else if (succ.length > 0)
        {
            res.render("profile", {username: username, info: "user is ghosted"});
        }
        else
        {
            //if user is not ghosted
            db.query("SELECT * FROM likes WHERE username = ?", [req.session.username], (err, results) => {
                if (err)
                    res.send(err);
                else
                {
                    var recent_like_back = "Empty";
                    if (results.length > 0)
                    {
                        let x = 0;
                        function like_back(username, likes, like_back) {
                            this.username = username,
                            this.likes = likes,
                            this.like_back = like_back
                        };
                        while (results[x])
                        {
                            if (results[x].like_back == 1)
                            {
                                recent_like_back = new like_back(results[x].username, results[x].likes, results[x].like_back)
                            }
                            x++;
                        }
                    }
                    res.render('profile', {username: username, recent_like_back: recent_like_back, info: ""});
                }
            })
        }
    })
    
})

module.exports = router;