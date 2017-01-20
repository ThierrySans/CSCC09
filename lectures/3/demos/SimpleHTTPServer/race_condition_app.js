var http = require('http');

const PORT=8080; 

var g_var = 0;

var handleRequest = function(request, response){
    var c_var = g_var + 1;
    setTimeout(function(){
        g_var = g_var + 1;
        console.log(c_var,g_var);
        response.end('Welcome race conditions!');
    },500);
};

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on http://localhost:%s", PORT);
});