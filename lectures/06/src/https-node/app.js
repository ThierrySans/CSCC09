const fs = require("fs");
const express = require('express');
const app = express();

/* ********************
*** Routing methods ***
*********************** */

app.get('/',function(req,res,next){
    res.end("hello world!");
});

/* *********
*** HTTP ***
************ */

// const http = require('http');
// const PORT = 3000;
//
// http.createServer(app).listen(PORT, function (err) {
//     if (err) console.log(err);
//     else console.log("HTTP server on http://localhost:%s", PORT);
// });

/* **********
*** HTTPS ***
************* */

// Generate a self-signed certificate
// openssl req -x509 -nodes -newkey rsa:4096 -keyout server.key -out server.crt
// Read the certificate 
// openssl x509 -in server.crt -text -noout

const https = require('https');
const PORT = 3030;

var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

https.createServer(config, app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTPS server on https://localhost:%s", PORT);
});