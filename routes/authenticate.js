const express = require('express');
var session = require('express-session');
var multer = require('multer');
var Objects = require('../objects');
var db = require('../database');
var nodemailer = require('nodemailer');
var unique_id = require('uniqid');

var router = express.Router();
var upload = multer({dest: 'Uploads/'});
var secretString = Math.floor((Math.random() * 10000) + 1);
router.use(session({
    secret: secretString.toString(),
    resave: false,
    saveUninitialized: false
}));

router.post('/auth', function(req, res) {
    //validate the input
    let firstname_check = req.body.firstname;
    let lastname_check = req.body.lastname;
    let username_check = req.body.username;
    let email_check = req.body.email;
    let password_check = req.body.password;
    
    if (firstname_check == "")
        var firstname = "empty";
    else
        var firstname = "";
    if (lastname_check == "")
        var lastname = "empty";
    else
        var lastname = "";
    if (username_check == "")
        var username = "empty";
    else
        var username = "";
    if (email_check == "")
        var email = "empty";
    else
        var email = "";
    if (password_check == "")
        var password = "empty";
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
            }
            else
                var password = "format";
        }
        else
            var password = "length";
        
    }
    if (firstname == "empty" || lastname == "empty" || username == "empty" || username == "taken" || email == "empty" || email == "taken" || password == "empty" || password == "length" || password == "format")
        res.render('signup', {firstname: firstname, lastname: lastname, username: username, email: email, password: password});
    else 
    {
        //check if username and email alread exists before inserting
        db.query("SELECT username FROM users WHERE username = ?", [username_check], (err, succ) => {
            if (err)
                console.log(err);
            if (succ.length > 0)
            {
                res.render('signup',  {firstname: "", lastname: "", username: "taken", email: "", password: ""})
            }
            else
            {
                db.query("INSERT INTO users (username, firstname, lastname, password, email, token, verified) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.username, req.body.firstname, req.body.lastname, req.body.password, 'N/A', 'N/A', 'false']);
                db.query("SELECT * FROM users WHERE email = ?", [req.body.email], (err, succ) => {
                    if (err)
                        console.log(err);
                    if (succ.length > 0)
                    {
                        db.query("DELETE FROM users WHERE username = ?", [req.body.username]);
                        res.render('signup', {firstname: "", lastname: "", username: "", email: "taken", password: ""})
                    }
                    else
                    {
                        db.query("UPDATE users SET email = ? WHERE username = ?", [req.body.email, req.body.username]);
                        var transport = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "enradcli@student.wethinkcode.co.za",
                                pass: "Paul444@"
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        })
                        var token = unique_id();
                        console.log(unique_id());
                        var mailOptions = {
                            from: "matcha@gmail.com",
                            to: req.body.email,
                            subject: "click on the link below to verify:",
                            text: "http://localhost:3002/verify_token?token="+token
                        };
                        db.query("UPDATE users SET token = ? WHERE username = ?", [token, req.body.username]);
                        db.query("UPDATE users SET verified = ? WHERE username = ?", ["false", req.body.username]);
                        transport.sendMail(mailOptions, (err, succ) => {
                            if (err)
                                console.log(err);
                            else
                                console.log("Email was successfully sent to "+req.body.email);
                        })
                        res.render('signup', {firstname: "", lastname: "", username: "", email: "", password: ""});
                    }
                });
            }
        });
    }
},)

module.exports = router;