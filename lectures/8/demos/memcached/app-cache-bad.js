var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

var Datastore = require('nedb')
var db = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true});

var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');

var getMessages = function(callback){
    memcached.get('messages', function (err, data) {
      if (err)  return callback(err, null);
      if (data){
          console.log("Retrieving messages from memcached");
          return callback(null, data);
      }
      console.log("Retrieving messages from the database");
      db.find({}, function (err, data) {
          if (err) return callback(err, null);
          var messages = data.map(function(message){return message.content;});
          console.log("Storing messages in memcached");
          memcached.set('messages', messages, 0, function (err) {
               if (err)  return callback(err, null);
               return callback(null, messages);
          });
      });
    });
}

var storeMessage = function(message, callback){
    // store message in the database
    console.log("Storing message in the database");
    db.insert({content: message}, function (err, data){
        if (err) return callback(err);
        console.log("Deleting messages in memcached");
        memcached.del('messages', function (err) {
            if (err) return callback(err);
            return callback(null);
        });
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
        else res.end(data.join("\n"));
        next();
    });
});

app.use(function (req, res, next){
    var time = Date.now() - req.start;
    console.log("HTTP Response", res.statusCode, time, "ms");
});


var http = require("http");
http.createServer(app).listen(3000, function(){
    console.log('HTTP on port 3000');
});
