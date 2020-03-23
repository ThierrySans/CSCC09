const bcrypt = require('bcrypt');
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cookie = require('cookie');

const jwt = require('jsonwebtoken');
let secret = "please change this secret";

const Datastore = require('nedb');
let users = new Datastore({ filename: 'db/users.db', autoload: true });

let isAuthenticated = function(req, res, next) {
    let cookies = cookie.parse(req.headers.cookie || '');
    if (cookies.token){
        let user =  jwt.verify(cookies.token, secret);
        if (!user) return res.status(401).end("access denied");
    } else {
        return res.status(401).end("access denied");
    }
    next();
};

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    let username = req.body.username;
    let password = req.body.password;
    // check if user already exists in the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        // generate a new salt and hash
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                 // insert new user into the database
                users.update({_id: username},{_id: username, hash: hash}, {upsert: true}, function(err){
                    if (err) return res.status(500).end(err);
                    return res.end("account created");
                });
            });
        });
    });
});

// curl -X POST -d "username=admin&password=pass4admin" -c cookie.txt http://localhost:3000/signin/
app.post('/signin/', function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied");
        bcrypt.compare(password, user.hash, function(err, valid) {
           if (err) return res.status(500).end(err);
           if (!valid) return res.status(401).end("access denied");
           // generate a token and store it in a cookie
           let token = jwt.sign(username, secret);
           res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
               path: '/',
               maxAge: 60 * 60 * 24 * 7 // 1 week
           }));
           return res.end("user " + username + " has been signed in");
        });        
    });
});

// curl -b cookie.txt -c cookie.txt  http://localhost:3000/signout/
app.get('/signout/', function(req, res, next){
    res.setHeader('Set-Cookie', cookie.serialize('token', String(''), {
        path: '/',
        maxAge: 0 // expire now
    }));
    return res.end("user has been signed out");    
});

// curl -b cookie.txt http://localhost:3000/private/
app.get('/private/', isAuthenticated, function (req, res, next) {
    return res.end("This is private");
});

// curl http://localhost:3000/public/
// curl -b cookie.txt http://localhost:3000/public/
app.get('/public/', function (req, res, next) {
    return res.end("This is public");
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
