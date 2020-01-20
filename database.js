var mysql = require('mysql');

//database connection setup
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: '',
    password: 'Radnic444',
    socketPath: '/goinfre/enradcli/Desktop/MAMP/mysql/tmp/mysql.sock',
    database: 'matcha'
    });
    db.connect();

module.exports = db;