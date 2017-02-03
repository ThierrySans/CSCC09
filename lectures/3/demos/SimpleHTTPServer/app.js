var http = require('http');

const PORT=3000; 

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
    });

    response.setHeader('X-Powered-By', 'greatful nodejs');
    response.statusCode = 404;
    response.end('welcome to C09');
};

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on http://localhost:%s", PORT);
});