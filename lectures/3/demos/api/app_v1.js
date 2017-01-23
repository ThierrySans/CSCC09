var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var messages = [];

app.post('/api/messages/', function (req, res, next) {
    var index = messages.length;
    messages.push(req.body);
    res.end(index.toString());
    next();
});

app.get('/api/messages/:id/', function (req, res, next) {
    res.end(messages[parseInt(req.params.id)]);
    next();
});

app.delete('/api/messages/:id/', function (req, res, next) {
    messages.splice(parseInt(req.params.id), 1);
    res.end("success");
    next();
});

app.use(function (req, res, next){
    console.log("DB", messages);
    console.log("HTTP Response", res.statusCode);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});