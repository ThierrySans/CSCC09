const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('static'));

var Item = (function(){
    var id = 0;
    return function item(item){
        this.id = id++;
        this.content = item.content;
    }
}());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var items = [];

app.get('/api/items/', function (req, res, next) {
    res.json(items);
    next();
});

app.post('/api/items/', function (req, res, next) {
    var item = new Item(req.body);
    items.push(item);
    res.json(item);
    next();
});

app.get('/api/items/:id/', function (req, res, next) {
    res.json(items[req.params.id]);
    next();
});

app.delete('/api/items/:id/', function (req, res, next) {
    var index = items.findIndex(function(e){
        return (e.id === parseInt(req.params.id));
    });
    if (index === -1) res.json(null);
    else{
        var item = items[index];
        items.splice(index, 1);
        res.json(item);
    }
    next();
});

app.use(function (req, res, next){
    console.log("Storage", JSON.stringify(items, null, 2));
    console.log("HTTP Response", res.statusCode);
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});