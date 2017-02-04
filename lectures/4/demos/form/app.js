var path = require('path');
var express = require('express')
var app = express();

// var bodyParser = require('body-parser');
// app.use(bodyParser.text({type:"*/*"}));
// app.use(bodyParser.urlencoded({ extended: false }));

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.use(express.static('static'));

var profile;

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url);
    next();
});

var messages = [];

app.post('/api/profile/', upload.single('picture'), function (req, res, next) {
    profile = req.file;
    profile.username = req.body.username;
    res.redirect('/');
    next();
});

app.get('/api/profile/', function (req, res, next) {
    if (profile) res.json({username: profile.username});
    else res.status(404).end("Profile not set");
    next();
});

// app.get('/api/profile/picture/', function (req, res, next) {
//     if (profile){
//         res.setHeader('Content-Type', profile.mimetype);
//         res.sendFile(path.join(__dirname, profile.path));
//     }
//     else res.status(404).end("Profile not set");
//     next();
// });

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});