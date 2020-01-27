const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});


// curl -H "Content-Type: application/json" -X POST -d '{"content":"hello world","author":"alice"}' localhost:3000/
app.post('/', function (req, res, next) {
    res.end(req.body.author + " says " + req.body.content);
});

// curl localhost:3000/
// curl localhost:3000/style/style.css
app.use(express.static('static'));

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});