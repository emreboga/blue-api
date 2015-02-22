var mongoose = require("mongoose");

var tvShowSchema = new mongoose.Schema({
    "_id": String,
    "name": String
});

var tvShow = mongoose.model("TVShow", tvShowSchema);

module.exports.Schema = tvShowSchema;
module.exports.TVShow = tvShow;