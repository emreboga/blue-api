var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    "_id": String,
    "name": String,
    "following": [{
        "_id": String,
        "season": Number,
        "episode": Number
    }]
});

var User = mongoose.model('User', userSchema);

module.exports.Schema = userSchema;
module.exports.User = User;
