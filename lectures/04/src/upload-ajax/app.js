const path = require('path');
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads')});

app.use(express.static('static'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var users = {};

app.post('/api/users/', upload.single('picture'), function (req, res, next) {
    if (req.body.username in users) res.status(409).end('user ' + username + ' already exists');
    users[req.body.username] = req.file;
    res.json(req.body.username);
});

app.get('/api/users/', function (req, res, next) {
    res.json(Object.keys(users));
});

app.get('/api/users/:username/profile/picture/', function (req, res, next) {
    if (!(req.params.username in users)) res.status(404).end('username ' + username + ' does not exists');
    else{
        var profile = users[req.params.username];
        res.setHeader('Content-Type', profile.mimetype);
        res.sendFile(profile.path);
    };
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});