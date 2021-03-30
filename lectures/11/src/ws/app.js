// code from https://github.com/y-temp4/express-ws-chat-sample

const express = require('express');
var app = express();

const expressWs = require('express-ws')(app);
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('static'));

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

var connects = [];
 
app.ws('/', function(ws, req) {
  
    connects.push(ws);
  
    ws.on('message', function(message) {
        console.log('Received -', message);
        connects.forEach(socket => {
            socket.send(message);
        });
    });

    ws.on('close', function(){
      connects = connects.filter(conn => {
        return (conn === ws) ? false : true;
      });
    }); 
});
 
app.listen(3000, function(){
    console.log('HTTP on port 3000');
});
