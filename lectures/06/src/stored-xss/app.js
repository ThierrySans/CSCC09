const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    next();
});

app.use(express.static('static'));

var data = "";

app.post('/api/', function (req, res, next) {
    data = req.body;
    res.end("Data saved");
});

app.get('/api/', function (req, res, next) {
    res.end(data);
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});