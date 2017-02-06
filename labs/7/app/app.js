var crypto = require('crypto');
var path = require('path');
var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.use(express.static('frontend'));

var Datastore = require('nedb');
var messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true});
var users = new Datastore({ filename: 'db/users.db', autoload: true });

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

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
}));

var checkAuthentication = function(req, res, next) {
  if (!req.session.user) return res.status(403).end("Forbidden");
  req.user = req.session.user;        
  next();
};

// signin, signout

app.delete('/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) res.status(500).end(err);
        return res.end();
    });
});

app.post('/signin/', function (req, res, next) {
    if (!req.body.username || ! req.body.password) return res.status(400).send("Bad Request");
    users.findOne({username: req.body.username}, function(err, user){
        if (err) return res.status(500).end("Database error");
        if (!checkPassword(user, req.body.password)) return res.status(401).send("Unauthorized");
        req.session.user = user;
        return res.json({username: user.username});
    });
});

// Create

app.put('/api/users/', function (req, res, next) {
    var data = new User(req.body);
    users.insert(data, function (err, user) {
        if (err) return res.status(409).end("Username " + req.body.username + " already exists");
        return res.json(user.username);
    });
});

app.post('/api/messages/', checkAuthentication, function (req, res, next) {
    var message = new Message(req.body);
    messages.insert(message, function (err, data) {
        data.id = data._id;
        return res.json(data);
    });
});

// Read

app.get('/api/messages/', function (req, res, next) {
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

app.patch('/api/users/:username/', checkAuthentication, upload.single('picture'), function (req, res, next) {
     if (req.params.username !== req.user.username) return res.status(403).send("Unauthorized");
     users.update({username: req.params.username}, {$set: {picture: req.file}}, {multi:false}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});

app.patch('/api/messages/:id/', checkAuthentication, function (req, res, next) {
    var data = {};
    data[req.body.action] = 1;
    messages.update({_id: req.params.id},{$inc: data},  {multi:false}, function (err, n) {
        if (err) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        return res.json("");
    });
});

// Delete

app.delete('/api/messages/:id/', checkAuthentication, function (req, res, next) {
    messages.findOne({ _id: req.params.id }, function(err, message){
        if (err) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        if (message.username !== req.user.username) return res.status(403).send("Unauthorized");
        messages.remove({ _id: req.params.id }, { multi: false }, function(err, num) {  
            if (err) return res.status(500).send("Database error");
            return res.end();
        });
    });  
});

app.listen(3000, function () {
  console.log('App listening on port 3000')
});