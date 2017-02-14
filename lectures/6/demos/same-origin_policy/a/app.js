var express = require('express')
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(function (req, res, next){
    res.cookie('origin', 'A');
    console.log("HTTP request", req.method, req.url);
    next();
});

app.use(express.static('frontend'));

app.get('/api/', function (req, res, next) {
    res.end("API data from A!");
    next();
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

var http = require('http');
var port = 3000;
http.createServer(app).listen(port, function(){
    console.log('HTTP on port ' + port);
});