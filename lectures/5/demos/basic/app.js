var express = require('express')
var app = express();

var getCredentials = function(req){
    if (!(req.headers.authorization)) return null;
     var encodedString = req.headers.authorization.split(' ')[1];
     var decodedString = Buffer.from(encodedString, 'base64').toString("ascii").split(":");
     return {username: decodedString[0], password: decodedString[1]};
}

var authenticate = function(req, res, next) {
    var credentials = getCredentials(req);    
    if (!credentials || credentials.username !== 'admin' || credentials.password !== 'pass4admin') {
      res.setHeader('WWW-Authenticate', 'Basic realm="User Realm"');
      return res.status(401).end("Access Denied");
    }
    return next();
};

// curl http://admin:pass4admin@localhost:3000/public/

app.get('/public/', function (req, res, next) {
    return res.end("This is public");
});

// curl -u admin:pass4admin http://localhost:3000/private/
// curl http://admin:pass4admin@localhost:3000/private/

app.get('/private/', authenticate, function (req, res, next) {
    return res.end("This is private");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
