const path = require('path');
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/users.db');

db.all("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");

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

// curl -X POST -d '{"username": "admin","password": "pass4admin"}' -H "Content-Type: application/json" http://localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
    var query = "INSERT INTO users(username,password) VALUES ('" + req.body.username + "','" +  req.body.password + "')";
    db.run(query, function(err, user){
        return res.end("account created");
    });
});

// curl -X POST -d "{\"username\": \"admin\", \"password\": \"blah' OR '1'='1\"}" -H "Content-Type: application/json" -c cookie.txt http://localhost:3000/signin/
app.post('/signin/', function (req, res, next) {
    var query = "SELECT * from users where USERNAME = '" + req.body.username + "' AND PASSWORD = '" +  req.body.password +"'";
    db.all(query, function(err, user){
        if (user && user.length===0) return res.status(401).end("access denied");
        req.session.user = user;
        return res.end("user " + req.body.username + " has been signed in");
    });
});

// curl -b cookie.txt http://localhost:3000/private/
app.get('/private/', isAuthenticated, function (req, res, next) {
    return res.end("This is private");
});

var http = require('http');
var port = 3000;
http.createServer(app).listen(port, function(){
    console.log('HTTP on port ' + port);
});