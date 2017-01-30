var express = require('express')
var app = express();

var auth = require('basic-auth');

var authenticate = function(req, res, next) {
    var credentials = auth(req);
    if (!credentials || credentials.name !== 'admin' || credentials.pass !== 'pass4admin') {
      res.setHeader('WWW-Authenticate', 'Basic realm="User Realm"');
      return res.status(401).end("Access Denied");
    }
    return next();
};

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
