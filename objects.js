const fs = require('fs');
const db = require('./database');

function postImages(username, images){
    this.username = username,
    this.images = images,
    this.post = function() {
        var x = 0;
        while (images[x])
        {
            let split = this.images[x].mimetype.split('/');
            let extension = split[1];
            let img = this.images[x].path+"."+extension;
            fs.rename(this.images[x].path, img, function(err) {
                if (err)
                {
                    console.log(err);
                }
            });
            db.query("INSERT INTO images (username, image) VALUES (?, ?)", [this.username, img], function(err) {
                if (err)
                {
                    console.log(err);
                }
            });
            x++;
        }
    }
}

module.exports = postImages;