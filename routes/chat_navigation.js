const express = require('express');
var session = require('express-session');
var db = require('../database');
var bodyParser = require('body-parser');
var Objects = require('../objects');

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

router.get('/chat_screen', (req, res) => {
    function user_info(username, profile_pic) {
        this.username = username,
        this.profile_pic = profile_pic
    };
    var user_data = [];
    db.query("SELECT * FROM user_profile WHERE username != ?", [req.session.username], (err, users) => {
        if (err)
            res.send("An error has occured!");
        else
        {
            db.query("SELECT * FROM likes WHERE username != ?", [req.session.username], (err, succ) => {
                if (err)
                    res.send("An error has occured!");
                else
                {
                    console.log(succ);
                    var x = 0;
                    while (succ[x])
                    {
                        if (succ[x].likes == req.session.username && succ[x].like_back == 1)
                        {
                            var y = 0;
                            while (users[y])
                            {
                                if (users[y].username == succ[x].username)
                                {
                                    var data = new user_info(users[y].username, users[y].profile_pic);
                                    user_data.push(data);
                                    break;
                                }
                                y++;
                            }
                        }
                        x++;
                    }
                    res.render('chat_navigation', {data: user_data});
                };
            });
        }
    })
    
});

module.exports = router;