var g_var = 0;

var handleRequest = function(request, response){
    var c_var = g_var + 1;
    setTimeout(function(){
        g_var = g_var + 1;
        console.log(c_var,g_var);
        response.end('Welcome race conditions!');
    },500);
};

const http = require('http');
const PORT = 3000;

http.createServer(handleRequest).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});