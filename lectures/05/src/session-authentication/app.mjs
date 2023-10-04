import { compare, genSalt, hash } from "bcrypt";
import { createServer } from "http";
import express from "express";
import Datastore from "nedb";
import session from "express-session";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "please change this secret",
    resave: false,
    saveUninitialized: true,
  }),
);

const users = new Datastore({ filename: "db/users.db", autoload: true });

function isAuthenticated(req, res, next) {
  if (!req.session.username) return res.status(401).end("access denied");
  return next();
}

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/
app.post("/signup/", function (req, res, next) {
  // extract data from HTTP request
  if (!("username" in req.body))
    return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  const username = req.body.username;
  const password = req.body.password;
  // check if user already exists in the database
  users.findOne({ _id: username }, function (err, user) {
    if (err) return res.status(500).end(err);
    if (user)
      return res.status(409).end("username " + username + " already exists");
    // generate a new salt and hash
    genSalt(10, function (err, salt) {
      hash(password, salt, function (err, hash) {
        // insert new user into the database
        users.update(
          { _id: username },
          { _id: username, hash: hash },
          { upsert: true },
          function (err) {
            if (err) return res.status(500).end(err);
            return res.end("account created");
          },
        );
      });
    });
  });
});

// curl -X POST -d "username=admin&password=pass4admin" -c cookie.txt http://localhost:3000/signin/
app.post("/signin/", function (req, res, next) {
  // extract data from HTTP request
  if (!("username" in req.body))
    return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  const username = req.body.username;
  const password = req.body.password;
  // retrieve user from the database
  users.findOne({ _id: username }, function (err, user) {
    if (err) return res.status(500).end(err);
    if (!user) return res.status(401).end("access denied");
    compare(password, user.hash, function (err, valid) {
      if (err) return res.status(500).end(err);
      if (!valid) return res.status(401).end("access denied");
      // start a session
      req.session.username = username;
      return res.end("user " + username + " has been signed in");
    });
  });
});

// curl -b cookie.txt -c cookie.txt http://localhost:3000/signout/
app.get("/signout/", function (req, res, next) {
  req.session.destroy();
  return res.end("user has been signed out");
});

// curl -b cookie.txt http://localhost:3000/private/
app.get("/private/", isAuthenticated, function (req, res, next) {
  return res.end("This is private");
});

// curl http://localhost:3000/public/
// curl -b cookie.txt http://localhost:3000/public/
app.get("/public/", function (req, res, next) {
  return res.end("This is public");
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
