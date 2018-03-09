const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

const Datastore = require('nedb')
var db = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true});

const Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');

var warmCache = function(){
    console.log("Retrieving messages from the database");
    db.find({}, function (err, data) {
        if (err) return callback(err, null);
        var messages = data.map(function(message){return message.content;}).join('/n');
        console.log("Storing messages in memcached");
        memcached.set('messages', messages, 0, function (err) {
             if (err) console.log(err);
        });
    });
}

var getMessages = function(callback){
    memcached.get('messages', function (err, data) {
      if (err)  return callback(err, null);
      return callback(null, data);
    });
}

var storeMessage = function(message, callback){
    // store message in the database
    console.log("Storing message in the database");
    db.insert({content: message}, function (err, data){
        if (err) return callback(err);
        warmCache();
        return callback(null);
    });
};

app.use(function (req, res, next){
    req.start = Date.now();
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// curl -X POST -d "hello" http://localhost:3000/messages/
app.post('/messages/', function (req, res, next) {
    storeMessage(req.body,function(err){
        if (err) res.status(500).end(err);
        else res.end("message stored");
        next();
    });
});

// curl http://localhost:3000/messages/
app.get('/messages/', function (req, res, next) {
    getMessages(function(err, data){
        if (err) res.status(500).end(err);
        else res.end(data);
        next();
    });
});

app.use(function (req, res, next){
    var time = Date.now() - req.start;
    console.log("HTTP Response", res.statusCode, time, "ms");
});



const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
