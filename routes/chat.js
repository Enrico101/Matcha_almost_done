const express = require('express');
var session = require('express-session');
var db = require('../database');
var bodyParser = require('body-parser');
var Objects = require('../objects');
var io = require('socket.io');

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

router.post('/chat', (req, res) => {
    //res.render('chat');
    console.log(req.body.user_liked);
    db.query("SELECT room_id FROM likes WHERE username = ? AND likes = ?", [req.session.username, req.body.user_liked], (err, succ) => {
        if (err)
            res.render('An error has occurred!');
        else
        {
            db.query("SELECT * FROM messages WHERE room_id = ?", [succ[0].room_id], (err, m_results) => {
                console.log(m_results);
                if (err)
                    res.send("An error has occured!");
                else
                {
                    res.render('chat', {room_id: succ[0].room_id, username: req.session.username, room_messages: m_results});
                }
            });
        }
    })
})

module.exports = router;