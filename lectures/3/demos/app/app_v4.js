var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

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

app.post('/api/messages/', function (req, res, next) {
    var data = JSON.parse(req.body);
    console.log(data)
    var message = new Message(data);
    messages.push(message);
    res.end(message.id.toString());
    next();
});

app.get('/api/messages/:id/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(messages[req.params.id]));
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