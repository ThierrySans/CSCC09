const express = require('express')
const app = express();

const cookie = require('cookie');

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    var cookies = cookie.parse(req.headers.cookie || '');
    if ('origin' in cookies) req.hasCookie = "cookies from " + cookies.origin;
    else req.hasCookie = "no origin cookie";
    console.log(req.hasCookie)
    res.setHeader('Set-Cookie', cookie.serialize('origin', 'B', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.get('/', function (req, res, next) {
    console.log("API data from B");
    // CORS
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Origin", "*");
    // CORS with credentials
    res.header("Access-Control-Allow-Credentials", true);
    res.end("API data from B (" + req.hasCookie + ")");
    next();
});

app.get('/jsonp/', function (req, res, next) {
    res.jsonp({key:'API data from B (using jsonp)'});
    next();
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});


const http = require('http');
const PORT = 3001;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});