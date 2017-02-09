var path = require('path');
var http = require('http');
var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads')});

app.use(express.static(path.join(__dirname,'frontend')));

var Datastore = require('nedb');
var messages = new Datastore({ filename: path.join(__dirname,'db', 'messages.db'), autoload: true, timestampData : true});
var users = new Datastore({ filename: path.join(__dirname,'db', 'users.db'), autoload: true });

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
    this.username = user.username;
    this.picture = null;
};

// signin, signout

app.delete('/signout/', function (req, res, next) {
    res.end();
});

app.post('/signin/', function (req, res, next) {
    users.findOne({username: req.body.username}, function(err, user){
        if (err) res.status(500).end("Database error");
        if (!user) res.status(401).end("Wrong username or password");
        else res.json(user);
    });
});

// Create

app.put('/api/users/', function (req, res, next) {
    var data = new User(req.body);
    users.insert(data, function (err, user) {
        if (err){
            res.status(409).end("Username " + req.body.username + " already exists");
            return next();
        }
        res.json(user);
        return next();
    });
});

app.post('/api/messages/', function (req, res, next) {
    var message = new Message(req.body);
    messages.insert(message, function (err, data) {
        data.id = data._id;
        res.json(data);
        return next();
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
            res.json(selectedMessages.reverse());
            return next();
        });
    });
});

app.get('/api/users/:username/picture/', function (req, res, next) {
    users.findOne({username: req.params.username}, function(err, user){
        if (err){
            res.status(404).end("User username:" + req.params.username + " does not exists");
            return next();
        }
        if (user.picture){
            res.setHeader('Content-Type', user.picture.mimetype);
            res.sendFile(user.picture.path);
            return next();
        }
        res.redirect('/media/user.png');
        return next();
    });    
});

// Update

app.patch('/api/users/:username/', upload.single('picture'), function (req, res, next) {
     users.update({username: req.params.username}, {$set: {picture: req.file}}, {multi:false}, function (err, n) {
         if (err){
             res.status(404).end("User username:" + req.params.username + " does not exists");
             return next();
         }
        res.json("");
        return next();
     });        
});

app.patch('/api/messages/:id/', function (req, res, next) {
    var data = {};
    data[req.body.action] = 1;
    messages.update({_id: req.params.id},{$inc: data},  {multi:false}, function (err, n) {
        if (err){
            res.status(404).end("Message id:" + req.params.id + " does not exists");
            return next();
        }
        res.json("");
        return next();
    });
    return next();
});

// Delete

app.delete('/api/messages/:id/', function (req, res, next) {
    messages.remove({ _id: req.params.id }, { multi: false }, function(err, num) {  
        if(num===0){
            res.status(404).end("Message id:" + req.params.id + " does not exists");
            return next();
        }
        res.end();
        return next();
    });
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

exports.app = app;

if (require.main === module) {
    http.createServer(app).listen(3000, function(){
        console.log('HTTP on port 3000');
    });
};


// app.listen(3000, function () {
//   console.log('App listening on port 3000')
// });