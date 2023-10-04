import { readFileSync } from "fs";
import { createServer } from "http";
import express from "express";
import session from "express-session";
import passport from "passport";
import TwitterStrategy from "passport-twitter";

const PORT = 3000;
const app = express();

app.use(
  session({
    secret: "please change this secret",
    resave: false,
    saveUninitialized: true,
  }),
);

// create credentials at https://developer.twitter.com/en/apps
const TwitterCredentials = JSON.parse(
  readFileSync("twitter.json.nogit", "utf8"),
);

passport.use(
  new TwitterStrategy(TwitterCredentials, function (
    token,
    tokenSecret,
    profile,
    callback,
  ) {
    console.log(profile);
    callback(null, profile);
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
  done(null, JSON.parse(user));
});

function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end("access denied");
  else next();
}

// signin
app.get("/auth/twitter/", passport.authenticate("twitter"));

// signin callback
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter"),
  function (req, res, next) {
    console.log(req.user);
    return res.end("user " + req.user.username + " has been signed in");
  },
);

// curl -b cookie.txt http://localhost:3000/private/
app.get("/private/", isAuthenticated, function (req, res, next) {
  return res.end("This is private");
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
