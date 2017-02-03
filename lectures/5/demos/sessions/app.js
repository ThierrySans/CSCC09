var express = require('express')
var app = express();

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// curl -b cookie.txt -c cookie.txt http://localhost:3000/

app.get('/', function (req, res, next) {
    var nbvisits = (req.session.nbvisits)? req.session.nbvisits + 1 : 1;
    req.session.nbvisits = nbvisits;
    return res.end("You have been visiting this site: " + nbvisits + " times");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
