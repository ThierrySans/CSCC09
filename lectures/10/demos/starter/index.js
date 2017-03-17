var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

app.use(express.static('frontend'));

var api = require('./backend/backAPI');

// curl localhost:3000/api/messages/

app.post('/api/messages/', function (req, res, next) {
    api.addMessage(req.body, function(err, data){
        if (err) return res.status(500).end(err);
        api.getMessages(function(err, data){
            if (err) return res.status(500).end(err);
            return res.json(data);
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"content":"Hello","username":"me"}' localhost:3000/api/messages/

app.get('/api/messages/', function (req, res, next) {
    api.getMessages(function(err, data){
        if (err) return res.status(500).end(err);
        return res.json(data);
    });
});

var http = require("http");
http.createServer(app).listen(3000, function(){
    console.log('HTTP on port 3000');
});
