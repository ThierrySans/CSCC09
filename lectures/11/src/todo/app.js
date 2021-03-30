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

/* *****************
*** db and cache ***
******************** */

const Datastore = require('nedb');
var users = new Datastore({ filename: 'db/users.db', autoload: true });
var items = new Datastore({ filename: path.join(__dirname,'db', 'items.db'), autoload: true, timestampData : true});

const Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');

/* *************
*** security ***
**************** */

const cookie = require('cookie');

const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, sameSite: true, secure: true}
}));


function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

const validator = require('validator');

app.use(function(req, res, next){
    var username = (req.session.username)? req.session.username : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

var isAuthenticated = function(req, res, next) {
    if (!req.session.username) return res.status(401).end("access denied");
    next();
};

var checkUsername = function(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

var sanitizeContent = function(req, res, next) {
    req.body.content = validator.escape(req.body.content);
    next();
}

var checkId = function(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) return res.status(400).end("bad input");
    next();
};

/* ********************
*** backend caching ***
*********************** */

// backend templates
// see ejs documentation: http://ejs.co/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'backend'));

memcached.flush(function(err){});

var warmCache = function(callback){
    console.log("Retrieving items from the database");
    items.find({}).sort({createdAt:-1}).limit(5).exec(function(err, items){
        if (err) return callback(err, null);
        console.log("Caching json items");
        memcached.set('items', items, 0, function(err){
            if (err) return callback(err, null);
                app.render('index', {items: items}, function(err, html){
                    if (err) return callback(err, null);
                    console.log("Caching index.html");
                    memcached.set('html', html, 0, function(err){
                        if (err) return callback(err, null);
                        return callback(null, items);
                    });
                });
        });
    });
}

warmCache(function(err, items){});

// HTTP 2
var jsFile = fs.readFileSync(path.join(__dirname, 'static', 'bundle.js'));
var mediaFile = fs.readFileSync(path.join(__dirname, 'static', 'media', 'delete-icon.png'));

app.get('/', function(req, res, next) {
    var js = res.push('/bundle.js', {
        status: 200,
        method: 'GET',
        response: {
          'content-type': 'application/javascript'
        }
    });
    js.end(jsFile);
    var media = res.push('/media/delete-icon.png', {
        status: 200,
        method: 'GET',
        response: {
          'content-type': 'image/png'
        }
    });
    media.end(mediaFile);
    // get html from cache
    memcached.get('html', function(err, html){
        if (err) return res.status(500).end(err);
        return res.end(html);
    });
});

app.use(express.static('static'));

/* *****************
*** Long Polling ***
******************** */

var longpoll = require("express-longpoll")(app);
longpoll.create("/api/items");
process.setMaxListeners(0);

/* ********
*** API ***
*********** */

app.post('/signup/', checkUsername, function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    var username = req.body.username;
    var password = req.body.password;
    // check if user already exists in the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        // generate a new salt and hash
        var salt = generateSalt();
        var hash = generateHash(password, salt);
        // insert new user into the database
        users.update({_id: username},{_id: username, hash: hash, salt: salt}, {upsert: true}, function(err){
            if (err) return res.status(500).end(err);
            return res.redirect("/");
        });
    });
});

app.post('/signin/', checkUsername, function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    var username = req.body.username;
    var password = req.body.password;
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

app.get('/signout/', function(req, res, next){
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.redirect("/");
});

app.post('/api/items/', sanitizeContent, isAuthenticated, function (req, res, next) {
    console.log("hello");
    items.insert({content: req.body.content, owner: req.session.username}, function (err, item) {
        if (err) return res.status(500).end(err);
         // update cache
        warmCache(function(err, items){
            if (err) return res.status(500).end(err);
            // publish long poll
            longpoll.publish("/api/items", items);
            return res.json(item);
        });
    });
});

app.delete('/api/items/:id/', isAuthenticated, checkId, function (req, res, next) {
    items.findOne({_id: req.params.id}, function(err, item){
        if (err) return res.status(500).end(err);
        if (item.owner !== req.session.username) return res.status(403).end("forbidden");
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        items.remove({ _id: item._id }, { multi: false }, function(err, num) {  
            // update cache
            warmCache(function(err, items){
                if (err) return res.status(500).end(err);
                 // publish long poll
                longpoll.publish("/api/items", items);
                return res.json(item);
            });
         });
    });    
});

var http2 = require('spdy');
const PORT = 3000;

var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

http2.createServer(config, app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTPS server on https://localhost:%s", PORT);
});
