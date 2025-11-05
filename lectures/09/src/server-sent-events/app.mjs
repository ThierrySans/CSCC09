import { createServer } from "http";
import express from "express";

const PORT = 3000;
const app = express();

function timer(t){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve();
        }, t)
    })
}

app.get('/processing', async function(req, res){
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    req.on('close', () => {
        res.end();
    });
    
    for (let i=0; i<100; i+=10){
        res.write(`data: Processing ${i}%\n\n`);
        await timer(2000);
    }
    
    res.write(`data: Processing Done\n\n`);
    res.end();
});

app.use(express.static("static"));

const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});