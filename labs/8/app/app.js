var crypto = require('crypto');
var path = require('path');
var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var Datastore = require('nedb');
var messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true});
var users = new Datastore({ filename: 'db/users.db', autoload: true });

// Message constructor
var Message = function(message){
        this.content = message.content;
        this.username = message.username;
        this.upvote = (message.upvote)? message.upvote : 0;
        this.downvote = (message.downvote)? message.downvote : 0;
};

var User = function(user){
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    this.username = user.username;
    this.picture = null;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
};

// Authentication

var checkPassword = function(user, password){
        var hash = crypto.createHmac('sha512', user.salt);
        hash.update(password);
        var value = hash.digest('base64');
        return (user.saltedHash === value);
};

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: true }
}));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

// sanitization and validation
var expressValidator = require('express-validator');
app.use(expressValidator({
    customValidators: {
        isAction: function(value) {
            return (['upvote','downvote'].indexOf(value) > -1);
        },
        fail: function(value){
            return false;
        }
    }
})); 

app.use(function(req, res, next){
    Object.keys(req.body).forEach(function(arg){
        switch(arg){
            case 'username':
                req.checkBody(arg, 'invalid username').isAlpha();
                break;
            case 'password':
                break;
            case 'content':
                req.sanitizeBody(arg).escape();
                break
            case 'action':
                req.checkBody(arg, 'invalid action').isAction();
                break;
            default:
                req.checkBody(arg, 'unknown argument').fail();
        }
    });
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) return res.status(400).send('Validation errors: ' + util.inspect(result.array()));
        else next();
    });
});

// serving the frontend

app.get('/', function (req, res, next) {
    if (!req.session.user) return res.redirect('/signin.html');
    return next();
});

app.get('/profile.html', function (req, res, next) {
    if (!req.session.user) return res.redirect('/signin.html');
    return next();
});

app.get('/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.redirect('/signin.html');
    });
});

app.use(express.static('frontend'));

// signout, signin

app.get('/api/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.end();
    });
});

app.post('/api/signin/', function (req, res, next) {
    if (!req.body.username || ! req.body.password) return res.status(400).send("Bad Request");
    users.findOne({username: req.body.username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user || !checkPassword(user, req.body.password)) return res.status(401).end("Unauthorized");
        req.session.user = user;
        res.cookie('username', user.username, {secure: true, sameSite: true});
        return res.json(user);
    });
});

// Create

app.put('/api/users/', function (req, res, next) {
    var data = new User(req.body);
    users.findOne({username: req.body.username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("Username " + req.body.username + " already exists");
        users.insert(data, function (err, user) {
            if (err) return res.status(500).end(err);
            return res.json(user);
        });
    });
});

app.post('/api/messages/', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    req.body.username = req.session.user.username;
    var message = new Message(req.body);
    messages.insert(message, function (err, data){
        data.id = data._id;
        return res.json(data);
    });
});

// Read

app.get('/api/messages/', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    messages.find({}).sort({createdAt:-1}).limit(5).exec(function(err, selectedMessages) { 
        var usernames = selectedMessages.map(function(e){return {username: e.username};});
        users.find({ $or: usernames}, function(err, selectedUsers){
            selectedMessages.forEach(function(e){
                var user = selectedUsers.find(function(u){return u.username === e.username;});
                e.picture = '/api/users/' + e.username + '/picture/';
                if (user.picture) e.mimetype = user.picture.mimetype
                return e;
            });
            return res.json(selectedMessages.reverse());
        });
    });
});

app.get('/api/users/:username/picture/', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    users.findOne({username: req.params.username}, function(err, user){
        if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
        if (user.picture){
            res.setHeader('Content-Type', user.picture.mimetype);
            return res.sendFile(path.join(__dirname, user.picture.path));
        }
        return res.redirect('/media/user.png');
    });    
});

// Update

app.patch('/api/users/:username/', upload.single('picture'), function (req, res, next) {
     if (req.params.username !== req.session.user.username) return res.status(403).send("Forbidden");
     users.update({username: req.params.username}, {$set: {picture: req.file}}, {multi:false}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});

app.patch('/api/messages/:id/', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    var data = {};
    data[req.body.action] = 1;
    messages.update({_id: req.params.id},{$inc: data},  {multi:false}, function (err, n) {
        if (err) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        return res.json("");
    });
});

// Delete

app.delete('/api/messages/:id/', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    messages.findOne({ _id: req.params.id }, function(err, message){
        if (err) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        if (message.username !== req.session.user.username) return res.status(403).send("Unauthorized");
        messages.remove({ _id: req.params.id }, { multi: false }, function(err, num) {  
            if (err) return res.status(500).send("Database error");
            return res.end();
        });
    });  
});

var fs = require('fs');
var https = require('https');
var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};
https.createServer(config, app).listen(3000, function () {
    console.log('HTTPS on port 3000');
});