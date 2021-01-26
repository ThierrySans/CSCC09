var getBody = function(request, callback){
    var body = "";
    request.on('data', function (chunk) {
      body += chunk;
    });
    request.on('end', function () {
       callback(null,body);
    });
    request.on('error', function (err) {
       callback(err,null);
    });
};

var handleRequest = function(request, response){
    console.log("Method:", request.method);
    console.log("Url:",request.url);
    console.log("Headers:", request.headers);
    getBody(request, function(err,data){
        if (err) console.error(err);
        else console.log("Body:",data);
        response.setHeader('X-Powered-By', 'nodejs with express');
        response.statusCode = 200;
        response.end('hello world!');
    });
};

const http = require('http');
const PORT = 3000;

http.createServer(handleRequest).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});