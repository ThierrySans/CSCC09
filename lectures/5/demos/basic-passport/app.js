var express = require('express')
var app = express();

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(function(username, password, callback) {
      if (username === 'admin' && password === 'pass4admin') return callback(null, true);
      return callback(null, false);
}));

app.get('/public/', function (req, res, next) {
    return res.end("This is public");
});

// curl -u admin:pass4admin http://localhost:3000/private/
// curl http://admin:pass4admin@localhost:3000/private/

app.get('/private/', passport.authenticate('basic', { session: false }), function (req, res, next) {
    return res.end("This is private");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
