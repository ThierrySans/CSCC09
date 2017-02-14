var path = require('path');
var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/users.db');

db.all("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

var checkAuthentication = function(req, res, next) {
  if (!req.session.user) return res.redirect('/signin.html');
  req.user = req.session.user;        
  next();
};

// signup, signin

app.post('/signup/', function (req, res, next) {
    var query = "INSERT INTO users(username,password) VALUES ('" + req.body.username + "','" +  req.body.password + "')";
    db.run(query, function(err, user){
        return res.end("");
    });
});

// password: blah' OR '1'='1

app.post('/signin/', function (req, res, next) {
    var query = "SELECT * from users where USERNAME = '" + req.body.username + "' AND PASSWORD = '" +  req.body.password +"'";
    console.log(query);
    db.all(query, function(err, user){
        console.log(user);
        if (user && user.length===0) return res.status(401).end("");
        req.session.user = user;
        return res.end("");
    });
});

app.use(express.static('frontend'));

app.get('/', checkAuthentication, function (req, res, next) {
    res.end("hello world!");
});

var http = require('http');
var port = 3000;
http.createServer(app).listen(port, function(){
    console.log('HTTP on port ' + port);
});