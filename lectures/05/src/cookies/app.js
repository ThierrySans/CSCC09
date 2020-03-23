const express = require('express')
const app = express();

const cookie = require('cookie');

// curl -c cookie.txt -b cookie.txt http://localhost:3000/
app.get('/', function (req, res, next) {
    let cookies = cookie.parse(req.headers.cookie || '');
    let nbvisits = (cookies.nbvisits)? parseInt(cookies.nbvisits) + 1 : 1;
    res.setHeader('Set-Cookie', cookie.serialize('nbvisits', String(nbvisits), {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.end("You have been visiting this site: " + nbvisits + " times");
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});