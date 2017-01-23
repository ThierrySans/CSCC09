var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

app.get('/', function (req, res, next) {
    res.end("Hello Get!");
    next();
});

app.post('/', function (req, res, next) {
    res.end("Hello Post!");
    next();
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

app.listen(3000, function () {
    console.log('app listening on port 3000!')
});