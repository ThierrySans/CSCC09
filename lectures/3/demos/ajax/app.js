var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var Message = (function(){
    var id = 0;
    return function Message(message){
        this.id = id++;
        this.content = message.content;
        this.author = message.author;
    }
}());

var messages = [];

app.post('/api/messages/', function (req, res, next) {
    var message = new Message(req.body);
    messages.push(message);
    res.json({id: message.id});
    next();
});

app.get('/api/messages/', function (req, res, next) {
    res.json(messages);
    next();
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

