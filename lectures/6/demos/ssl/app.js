var fs = require("fs");
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

/* ********************
*** Routing methods ***
*********************** */

app.get('/',function(req,res,next){
    res.end("hello world!");
});

/* *********
*** HTTP ***
************ */

http.createServer(app).listen(3000, function(){
    console.log('HTTP on port 3000');
});

/* **********
*** HTTPS ***
************* */

// Generate a self-signed certificate
// openssl req -x509 -nodes -newkey rsa:4096 -keyout server.key -out server.crt

var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};
https.createServer(config, app).listen(3030, function () {
    console.log('HTTPS on port 3030');
});