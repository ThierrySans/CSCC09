var express = require('express')
var app = express();

var passport = require('passport');
var DigestStrategy = require('passport-http').DigestStrategy;

passport.use(new DigestStrategy({ qop: 'auth' }, function(username, callback) {
      if (username === 'admin') return callback(null, true, 'pass4admin');
      return callback(null, false);
},function(params, done) {
    // validate nonces as necessary
    done(null, true)
}));

app.get('/public/', function (req, res, next) {
    return res.end("This is public");
});

// curl -u admin:pass4admin --digest http://localhost:3000/private/

app.get('/private/', passport.authenticate('digest', { session: false }), function (req, res, next) {
    return res.end("This is private");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
