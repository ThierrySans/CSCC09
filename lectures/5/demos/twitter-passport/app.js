// node.js standard library
var crypto = require('crypto');

var express = require('express')
var app = express();

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
  consumerKey: "kld9UGek22S7DuZMNiWeqlA0o",
  consumerSecret: "kNhZ3pUbWmGCsWxCho7tCo1k1oJRoYqKJYcupRWdAWKk0dDL9J",
  callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
}, function(accessToken, refreshToken, profile, done) {
      done(null, profile);
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req,res,next){
    console.log("hello");
    return res.end("User authenticated");
});
                                     
function checkAuthentication(req,res,next) {
  if ( !req.isAuthenticated() ) { 
     res.status(403);     
     return res.end("Forbidden"); 
  }                   
  next();
}

// curl -b cookie.txt http://localhost:3000/private/

app.get('/private/', checkAuthentication, function (req, res, next) {
    console.log(req.user);
    return res.end("This is private");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
