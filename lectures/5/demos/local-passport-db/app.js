// node.js standard library
var crypto = require('crypto');

var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var Datastore = require('nedb')
  , users = new Datastore({ filename: 'db/users.db', autoload: true });

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  users.findOne({_id: id}, function(err, user) {      
        done(err, user);
  });
});

var signup = function(username, password){
      var salt = crypto.randomBytes(16).toString('base64');
      var hash = crypto.createHmac('sha512', salt);
      hash.update(password);
      var value = hash.digest('base64');
      users.update({_id: username},{_id: username, hash: value, salt: salt}, {upsert: true});
}

var checkPassword = function(user, password){
        var hash = crypto.createHmac('sha512', user.salt);
        hash.update(password);
        var value = hash.digest('base64');
        return (user.hash === value);
};

passport.use(new LocalStrategy(function(username, password, callback) {
      users.findOne({_id: username}, function(err, user){
          if (err) return callback(err, null);
          if (!(user)) return callback(null, false);
          if (!checkPassword(user, password)) return callback(null, false);
          return callback(null, user);
      });
}));

var checkAuthentication = function(req,res,next) {
  if ( !req.isAuthenticated() ) { 
     res.status(403);     
     return res.end("Forbidden"); 
  }                   
  next();
};

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/

app.post('/signup/', function (req, res, next) {
    signup(req.body.username, req.body.password);
    return res.end("Account created");
});

// curl -X POST -d "username=admin&password=pass4admin" -c cookie.txt http://localhost:3000/signin/

app.post('/signin/', passport.authenticate('local'), function (req, res, next) {
    return res.end("User " + req.user._id + " signed in");
});

// curl http://localhost:3000/signout/

app.get('/signout/', function(req, res){
    req.logout();
    return res.end("User has been signed out");
});

// curl -b cookie.txt http://localhost:3000/private/

app.get('/private/', checkAuthentication, function (req, res, next) {
    console.log(req.user);
    return res.end("This is private");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
