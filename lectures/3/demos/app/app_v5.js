var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('static'));

var Message = (function(){
    var id = 0;
    return function Message(message){
        this.id = id++;
        this.content = message.content;
        this.author = message.author
    }
}());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var messages = [];

var function sanitize(){
    message.content = escape(message.content);
    if (message.content.length > 50) {
        message.content = message.content.substr(0,50);
    }
    message.author = escape(message.author);
    if (message.author.length > 50) {
        message.author = message.author.substr(0,50);
    }
}

app.get('/api/messages/', function (req, res, next) {
    res.json(messages);
    next();
});

app.post('/api/messages/', function (req, res, next) {
    var message = new Message(req.body);
    messages.push(message);
    res.end(message.id.toString());
    next();
});

app.get('/api/messages/:id/', function (req, res, next) {
    res.json(messages[req.params.id]);
    next();
});

app.delete('/api/messages/:id/', function (req, res, next) {
    messages = messages.filter(function(e){
        return(e.id !== parseInt(req.params.id));
    });
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