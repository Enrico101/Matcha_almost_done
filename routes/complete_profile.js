const express = require('express');
var session = require('express-session');
var multer = require('multer');
var Objects = require('../objects');
var db = require('../database');
var unirest = require('unirest');
var ip_loc = require('ip-locator');

var router = express.Router();
var upload = multer({dest: 'Uploads/'});
var secretString = Math.floor((Math.random() * 10000) + 1);
router.use(session({
    secret: secretString.toString(),
    resave: false,
    saveUninitialized: false
}));

router.post('/complete_profile', upload.array('photos', 5), function(req, res) {
    if (req.body.long.length == 0 ||  req.body.lat.length == 0)
    {
        var apiCall = unirest('GET', 'https://get.geojs.io/v1/ip');
        
        apiCall.end((response) => {
            if (response.body.length > 0)
            {
                console.log("this far");
                ip_loc.getDomainOrIPDetails(response.body, 'json', (err, data) => {
                    if (err)
                        res.send("An error has occured!");
                    else
                    {
                        req.body.long = data.lon;
                        req.body.lat = data.lat;
                
                        if (req.body.submit == "next")
                        {
                            if (typeof req.body.prefence != "undefined")
                            {
                                var prefence = "bi-sexual";
                            }
                            else
                            {
                                var prefence = req.body.prefence;
                            }
                            var interests = "";
                            if (req.body.interest1)
                                interests += "#"+req.body.interest1;
                            if (req.body.interest2)
                                interests += "#"+req.body.interest2;
                            if (req.body.interest3)
                                interests += "#"+req.body.interest3;
                            if (req.body.interest4)
                                interests += "#"+req.body.interest4;
                            if (req.body.interest5)
                                interests += "#"+req.body.interest5;
                            if ((req.body.age != "") && (req.body.bio != "") && (req.session.username) && (req.body.distance != "") && (interests != ""))
                            {
                                db.query('INSERT INTO user_profile (gender, age, prefence, bio, username, preferred_distance, longitude, latitude, user_interests, profile_pic, fame_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.gender, req.body.age, req.body.prefence, req.body.bio, req.session.username, req.body.distance, req.body.long, req.body.lat, interests, "Not_staged", 0]);
                                if (req.files.length > 0)
                                {
                                    let postImages = new Objects(req.session.username, req.files);
                                    postImages.post();
                                    res.redirect('/set_profile_pic');
                                }
                                else
                                    res.redirect('./profile');
                            }
                            else
                            {
                                res.render("set_profile", {username: req.session.username, info: "incomplete"});
                            }
                        }
                        else if (req.body.submit == "skip")
                        {
                            //ghost the user.
                            console.log(req.body.submit);
                            db.query('INSERT INTO user_profile (gender, age, prefence, bio, username, preferred_distance, longitude, latitude, user_interests, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ["Not_staged", 0, "Not_staged", "Not_staged", req.session.username, 0, req.body.long, req.body.lat, "Not_staged", "Not_staged", 0], (err, succ) => {
                                if (err)
                                    res.send(err);
                                else
                                {
                                    db.query("INSERT INTO ghost_mode (username) VALUES (?)", [req.session.username], (err, succ) => {
                                        if (err)
                                            res.send("An error has occured!");
                                        else
                                        {
                                            res.redirect("/profile");
                                        }
                                    })
                                }
                            });
                        }
                    }
                })
            }
        })
    }
    else
    {
        if (req.body.submit == "next")
        {
            if (typeof req.body.prefence != "undefined")
            {
                var prefence = "bi-sexual";
            }
            else
            {
                var prefence = req.body.prefence;
            }
            var interests = "";
            if (req.body.interest1)
                interests += "#"+req.body.interest1;
            if (req.body.interest2)
                interests += "#"+req.body.interest2;
            if (req.body.interest3)
                interests += "#"+req.body.interest3;
            if (req.body.interest4)
                interests += "#"+req.body.interest4;
            if (req.body.interest5)
                interests += "#"+req.body.interest5;
            if ((req.body.age != "") && (req.body.bio != "") && (req.session.username) && (req.body.distance != "") && (interests != ""))
            {
                db.query('INSERT INTO user_profile (gender, age, prefence, bio, username, preferred_distance, longitude, latitude, user_interests, profile_pic, fame_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.gender, req.body.age, req.body.prefence, req.body.bio, req.session.username, req.body.distance, req.body.long, req.body.lat, interests, "Not_staged", 0]);
                if (req.files.length > 0)
                {
                    let postImages = new Objects(req.session.username, req.files);
                    postImages.post();
                    res.redirect('/set_profile_pic');
                }
                else
                    res.redirect('./profile');
            }
            else
            {
                res.render("set_profile", {username: req.session.username, info: "incomplete"});
            }
        }
        else if (req.body.submit == "skip")
        {
            //ghost the user.
            console.log(req.body.submit);
            db.query('INSERT INTO user_profile (gender, age, prefence, bio, username, preferred_distance, longitude, latitude, user_interests, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ["Not_staged", 0, "Not_staged", "Not_staged", req.session.username, 0, req.body.long, req.body.lat, "Not_staged", "Not_staged", 0], (err, succ) => {
                if (err)
                    res.send(err);
                else
                {
                    db.query("INSERT INTO ghost_mode (username) VALUES (?)", [req.session.username], (err, succ) => {
                        if (err)
                            res.send("An error has occured!");
                        else
                        {
                            res.redirect("/profile");
                        }
                    })
                }
            });
        }
    }
});

module.exports = router;