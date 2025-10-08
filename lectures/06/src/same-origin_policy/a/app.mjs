import { createServer } from "http";
import express from "express";
import cookie from "cookie";

const PORT = 3000;
const app = express();

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
	console.log(req.headers.cookie)
    var cookies = cookie.parse(req.headers.cookie || '');
    if ('origin' in cookies) req.hasCookie = "cookies from " + cookies.origin;
    else req.hasCookie = "no origin cookie";
    next();
});

app.use(express.static('static'));

app.get('/', function (req, res, next) {
    console.log("API data from A");
    res.end("API data from A");
});

createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});