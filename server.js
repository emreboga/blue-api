// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// create Express application
var app = express();

// connect to mongodb (currently using local database)
mongoose.connect('mongodb://localhost/blue-test');
var User = require('./api/models/user').User;
var TVShow = require('./api/models/tvshow').TVShow;

// add body-parser middleware
app.use(bodyParser());

// set port
var port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
var router = express.Router();

// Logging middleware for all routes
router.use(function(req, res, next) {
    console.log('Call received');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7777');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Create user / Get all users
// ===========================
router.route('/users')
    .post(function(req, res) {
        // create the user object to be saved
        var user = new User();
        user.name = req.body.name;
        user._id = req.body.id;
        if (req.body.following) {
            user.following = JSON.parse(req.body.following);
        } else {
            user.following = [];
        }

        // save the user and check for errors
        user.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: "User " + user.name + " is created" });
        });
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

// Get / Set user by ID
// ====================
router.route('/users/:id')
    .get(function(req, res) {
        // find user with id
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })
    .put(function(req, res) {
        // find user with id
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.send(err);
            }

            // update user info
            user.name = req.body.name;
            user.following = JSON.parse(req.body.following);

            // save the user and check for errors
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "User " + user.name + " is updated" });
            });
        });
    });

// Get all TV Shows
// ================
router.route('/tvshows')
    .get(function(req, res) {
        TVShow.find(function(err, tvhsows) {
            if (err) {
                res.send(err);
            }
            res.json(tvhsows);
        });
    });

// Get TV Show by ID
// =================
router.route('/tvshows/:id')
    .get(function(req, res) {
        TVShow.findById(req.params.id, function(err, tvshow) {
            if (err) {
                res.send(err);
            }
            res.json(tvshow);
        });
    });

// all API routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Blue-API is now listening on " + port);
