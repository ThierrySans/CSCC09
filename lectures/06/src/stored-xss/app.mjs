import { createServer } from "http";
import express from "express";

const PORT = 3000;
const app = express();

app.use(express.text({type:"*/*"}));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    next();
});

app.use(express.static('static'));

let data = "";

app.post('/api/', function (req, res, next) {
    res.end(req.body);
});

app.get('/api/', function (req, res, next) {
    res.end(data);
});

createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});