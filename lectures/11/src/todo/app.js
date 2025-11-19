const path = require('path')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

const api = require('./backend/backAPI');

/* *********
*** i18n ***
************ */

const i18n = require("i18n");
i18n.configure({
    locales:['en', 'fr', 'es'],
    directory: path.join(__dirname, 'backend/locales'),
    defaultLocale: 'en',
});

app.use(i18n.init);

app.get('/i18n', function(req, res, next) {
    res.end(res.__('hello'));
});

/* ***********
*** static ***
************** */

app.use(express.static('frontend'));

/* **************
*** templates ***
***************** */

// see ejs documentation: http://ejs.co/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'backend/views'));

app.get('/', function(req, res, next) {
    api.getMessages(function(err, data){
        if (err) return res.status(500).end(err);
        return res.render('index', {messages: data});
    });
});

/* ********
*** API ***
*********** */

// curl localhost:3000/api/messages/

app.post('/api/messages/', function (req, res, next) {
    api.addMessage(req.body, function(err, data){
        if (err) return res.status(500).end(err);
        api.getMessages(function(err, data){
            if (err) return res.status(500).end(err);
            return res.json(data);
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"content":"Hello","username":"me"}' localhost:3000/api/messages/

app.get('/api/messages/', function (req, res, next) {
    api.getMessages(function(err, data){
        if (err) return res.status(500).end(err);
        return res.json(data);
    });
});

/* *********
*** HTTP ***
************ */

var http = require("http");
http.createServer(app).listen(3000, function(){
    console.log('HTTP on port 3000');
});
