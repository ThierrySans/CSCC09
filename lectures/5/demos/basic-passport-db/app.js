// node.js standard library
var crypto = require('crypto');

var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var Datastore = require('nedb')
  , users = new Datastore({ filename: 'db/users.db', autoload: true });

var signup = function(username, password){
      var salt = crypto.randomBytes(16).toString('hex');
      var hash = crypto.createHmac('sha512', salt);
      hash.update(password);
      var value = hash.digest('hex');
      users.update({_id: username},{_id: username, hash: value, salt: salt}, {upsert: true});
}

var checkPassword = function(user, password){
        var hash = crypto.createHmac('sha512', user.salt);
        hash.update(password);
        var value = hash.digest('hex');
        return (user.hash === value);
};

passport.use(new BasicStrategy(function(username, password, callback) {
      users.findOne({_id: username}, function(err,user){
          if (err) return callback(err, null);
          if (!(user)) return callback(null, false);
          return callback(null, checkPassword(user, password));
      });
}));

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/

app.post('/signup/', function (req, res, next) {
    signup(req.body.username, req.body.password);
    return res.end("Account created");
});

// curl -u admin:pass4admin http://localhost:3000/private/

app.get('/private/', passport.authenticate('basic', { session: false }), function (req, res, next) {
    // with database
    // console.log(req.user);
    return res.end("This is private");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
