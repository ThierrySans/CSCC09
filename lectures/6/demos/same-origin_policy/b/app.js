var express = require('express')
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    res.cookie('origin', 'B');
    next();
});

app.get('/', function (req, res, next) {
    res.end("hello world from B")
    next();
});

app.get('/api/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.end("API data from B!");
    next();
});

app.get('/api/jsonp/', function (req, res, next) {
    res.jsonp({key:'API data from B (using jsonp)'});
    next();
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});


var http = require('http');
var port = 3001;
http.createServer(app).listen(port, function(){
    console.log('HTTP on port ' + port);
});