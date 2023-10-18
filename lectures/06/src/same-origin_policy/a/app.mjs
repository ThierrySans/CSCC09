import { createServer } from "http";
import express from "express";

const PORT = 3000;
const app = express();

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
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