var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('frontend'));

// Message constructor
var Message = function(message){
        this.id = message.id;
        this.content = message.content;
        this.username = message.username;
        this.upvote = (message.upvote)? message.upvote : 0;
        this.downvote = (message.downvote)? message.downvote : 0;
};

var User = function(user){
    this.username = user.username;
    this.picture = null;
};

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

var messages = {};
var users = {};

// Create

app.put('/api/users/', function (req, res, next) {
    if (req.body.username in users){
        res.status(409).end("Username:" + req.body.username + " already exists");
        return next();
    }
    var user = new User(req.body);
    users[user.username] = user;
    res.json(user);
    return next();
});

app.post('/api/messages/', function (req, res, next) {
    var id;
    do{
        id = Math.random().toString(36).substring(7);
    }while(id in messages);
    req.body.id = id;
    var message = new Message(req.body);
    messages[message.id] = message;
    res.json(message);
    return next();
});

// Read

app.get('/api/messages/', function (req, res, next) {
    res.json(Object.values(messages));
    return next();
});

app.get('/api/users/', function (req, res, next) {
    res.json(Object.values(users));
    return next();
});

// Update

app.patch('/api/messages/:id/', function (req, res, next) {
    var message = messages[req.params.id];
    if (!(message)){
        res.status(404).end("Message id:" + req.params.id + " does not exists");
        return next();
    }
    switch(req.body.action){
        case ("upvote"):
            message.upvote+=1;
            break
        case ("downvote"):
            message.downvote+=1;
            break;
    }
    res.json(message);
    return next();
});

// Delete

app.delete('/api/messages/:id/', function (req, res, next) {
    var message = messages[req.params.id];
    if (!(message)){
        res.status(404).end("Message id:" + req.params.id + " does not exists");
        return next();
    } 
    delete messages[req.params.id];
    res.json(message);
    return next();
});

app.use(function (req, res, next){
    console.log("messages", messages);
    console.log("users", users);
    console.log("HTTP Response", res.statusCode);
});


app.listen(3000, function () {
  console.log('App listening on port 3000')
});