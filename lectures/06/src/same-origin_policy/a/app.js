const express = require('express')
const app = express();

const cookie = require('cookie');

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    next();
});

app.use(express.static('static'));

app.get('/', function (req, res, next) {
    console.log("API data from A");
    res.end("API data from A");
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});