const express = require('express')
const app = express();

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    next();
});

// curl localhost:3000/
app.get('/', function (req, res, next) {
    res.end(req.path + ": the root");
});

// curl localhost:3000/messages/
app.get('/messages/', function (req, res, next) {
    res.end(req.path + ": get all messages");
});

// curl localhost:3000/messages/1234/
app.get('/messages/:id/', function (req, res, next) {
    res.end(req.path + ": get the message " + req.params.id);
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});