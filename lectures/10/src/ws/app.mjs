import express from 'express';
import expressWs from 'express-ws';

const { app } = expressWs(express());

app.use(express.static('static'));

let connects = [];

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
