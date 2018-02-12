const path = require('path');
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Datastore = require('nedb');
var users = new Datastore({ filename: 'db/users.db', autoload: true });

const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    next();
});

var isAuthenticated = function(req, res, next) {
    if (!req.user) return res.status(401).end("access denied");
    next();
};

// curl -X POST -d '{"username":"admin","password": "pass4admin"}' -H "Content-Type: application/json" http://localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
    users.insert(req.body, function (err, user) {
        return res.end("account created");
    });
});

// curl -X POST -d '{"username":"admin","password": {"$gt": ""}}' -H "Content-Type: application/json" -c cookie.txt http://localhost:3000/signin/
app.post('/signin/', function (req, res, next) {
    console.log({username: req.body.username, password: req.body.password});
    users.findOne({username: req.body.username, password: req.body.password}, function(err, user){
        if (!(user)) return res.status(401).end("access denied");
        req.session.user = user;
        return res.end("user " + req.body.username + " has been signed in");
    });
});

// curl -b cookie.txt http://localhost:3000/private/
app.get('/private/', isAuthenticated, function (req, res, next) {
    return res.end("This is private");
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});