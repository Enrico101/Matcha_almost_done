const express = require('express');
var router = express.Router();

router.get('/example', (req, res) => {
    res.send("This is an example.Welcome");
})

module.exports = router;