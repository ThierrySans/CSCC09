var path = require('path');
var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Datastore = require('nedb');
var users = new Datastore({ filename: 'db/users.db', autoload: true });

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
    users.insert(req.body, function (err, user) {
        return res.end("");
    });
});

// curl -X POST -d '{"username":"admin","password": {"$gt": ""}}' -H "Content-Type: application/json" http://localhost:3000/signin/ -v

app.post('/signin/', function (req, res, next) {
    console.log({username: req.body.username, password: req.body.password});
    users.findOne({username: req.body.username, password: req.body.password}, function(err, user){
        if (!(user)) return res.status(401).end("");
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