var express = require('express')
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// curl -b cookie.txt -c cookie.txt http://localhost:3000/

app.get('/', function (req, res, next) {
    var nbvisits = (req.cookies.nbvisits)? parseInt(req.cookies.nbvisits) + 1 : 1;
    res.cookie('nbvisits', nbvisits);
    return res.end("You have been visiting this site: " + nbvisits + " times");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
