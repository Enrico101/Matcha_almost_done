const express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
    res.render('login', {info: ""});
})

module.exports = router;