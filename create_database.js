var db = require('./database');

db.query("CREATE TABLE IF NOT EXISTS ghost_mode (username VARCHAR(255) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("ghost_mode table created");
})
db.query("CREATE TABLE IF NOT EXISTS images (username VARCHAR(255) NOT NULL, image VARCHAR(1500) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("images table created");
})
db.query("CREATE TABLE IF NOT EXISTS likes (username VARCHAR(255) NOT NULL, likes VARCHAR(255) NOT NULL, like_back INT NOT NULL, room_id VARCHAR(50) NOT NULL, status VARCHAR(50) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("likes table created");
})
db.query("CREATE TABLE IF NOT EXISTS messages (username VARCHAR(255) NOT NULL, message VARCHAR(255) NOT NULL, room_id INT NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("messages table created");
})
db.query("CREATE TABLE IF NOT EXISTS users (username VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, password VARCHAR(500) NOT NULL, email VARCHAR(500) NOT NULL, token VARCHAR(500) NOT NULL, verified VARCHAR(50) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("users table created");
})
db.query("CREATE TABLE IF NOT EXISTS user_profile (gender VARCHAR(50) NOT NULL, age INT NOT NULL, prefence VARCHAR(255) NOT NULL, bio VARCHAR(1000) NOT NULL, username VARCHAR(255) NOT NULL, preferred_distance INT NOT NULL, longitude FLOAT NOT NULL, latitude FLOAT NOT NULL, user_interests VARCHAR(1000) NOT NULL, profile_pic VARCHAR(1000) NOT NULL, fame_rating FLOAT NOT NULL, status VARCHAR(255) NOT NULL DEFAULT 'offline', date_of_last_connection VARCHAR(50) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("user_profile table created");
})
db.query("CREATE TABLE IF NOT EXISTS blocked_users (blocked_user VARCHAR(255) NOT NULL, blocker VARCHAR(255) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("user_profile table created");
})
db.query("CREATE TABLE IF NOT EXISTS admin (username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("user_profile table created");
})
db.query("CREATE TABLE IF NOT EXISTS reported (reported_user VARCHAR(255) NOT NULL, reported_by VARCHAR(255) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("user_profile table created");
})
db.query("CREATE TABLE IF NOT EXISTS views (username VARCHAR(255) NOT NULL, visitor VARCHAR(255) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("ghost_mode table created");
})
setTimeout(() => {
    process.exit(0);
}, 1500);