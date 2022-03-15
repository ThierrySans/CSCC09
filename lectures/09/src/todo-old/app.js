const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const validator = require('validator');

const Datastore = require('nedb');
const users = new Datastore({ filename: 'db/users.db', autoload: true });
const items = new Datastore({ filename: path.join(__dirname,'db', 'items.db'), autoload: true, timestampData : true});

const cookie = require('cookie');

const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, sameSite: true}
}));

// we use http for dev but https fpor production
if (app.get('env') === 'production') {
    session.cookie.secure = true;
}

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

app.use(function(req, res, next){
    let username = (req.session.username)? req.session.username : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.use(express.static('static'));

const isAuthenticated = function(req, res, next) {
    if (!req.session.username) return res.status(401).end("access denied");
    next();
};

const checkUsername = function(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

const sanitizeContent = function(req, res, next) {
    req.body.content = validator.escape(req.body.content);
    next();
}

const checkId = function(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) return res.status(400).end("bad input");
    next();
};

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/
app.post('/signup/', checkUsername, function (req, res, next) {
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
        let salt = generateSalt();
        let hash = generateHash(password, salt);
        // insert new user into the database
        users.update({_id: username},{_id: username, hash: hash, salt: salt}, {upsert: true}, function(err){
            if (err) return res.status(500).end(err);
            return res.redirect("/");
        });
    });
});

// curl -X POST -d "username=admin&password=pass4admin" -c cookie.txt http://localhost:3000/signin/
app.post('/signin/', checkUsername, function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied");
        if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); // invalid password
        // start a session
        req.session.username = user._id;
        return res.redirect("/");
    });
});

// curl -b cookie.txt -c cookie.txt http://localhost:3000/signout/
app.get('/signout/', function(req, res, next){
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.redirect("/");
});

app.get('/api/items/', function (req, res, next) {
    items.find({}).sort({createdAt:-1}).limit(5).exec(function(err, items) { 
        if (err) return res.status(500).end(err);
        return res.json(items.reverse());
    });
});

app.post('/api/items/', sanitizeContent, isAuthenticated, function (req, res, next) {
    items.insert({content: req.body.content, owner: req.session.username}, function (err, item) {
        if (err) return res.status(500).end(err);
        return res.json(item);
    });
});

app.get('/api/items/:id/', checkId, function (req, res, next) {
    items.findOne({_id: req.params.id}, function(err, item){
        if (err) return res.status(500).end(err);
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        return res.json(item);
    });    
});

app.delete('/api/items/:id/', isAuthenticated, checkId, function (req, res, next) {
    items.findOne({_id: req.params.id}, function(err, item){
        if (err) return res.status(500).end(err);
        if (item.owner !== req.session.username) return res.status(403).end("forbidden");
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        items.remove({ _id: item._id }, { multi: false }, function(err, num) {  
            res.json(item);
         });
    });    
});


const https = require('https');
const PORT = 3000;

const privateKey = fs.readFileSync( 'server.key' );
const certificate = fs.readFileSync( 'server.crt' );
const config = {
        key: privateKey,
        cert: certificate
};

https.createServer(config, app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTPS server on https://localhost:%s", PORT);
});