import { compare, genSalt, hash } from "bcrypt";
import { createServer } from "http";
import express from "express";
import Datastore from "nedb";
import { serialize, parse } from "cookie";
import jwt from "jsonwebtoken";

const PORT = 3000;
const secret = "please change this secret";
const app = express();

app.use(express.urlencoded({ extended: false }));

const users = new Datastore({ filename: "db/users.db", autoload: true });

function isAuthenticated(req, res, next) {
  const cookies = parse(req.headers.cookie || "");
  if (cookies.token) {
    const user = jwt.verify(cookies.token, secret);
    if (!user) return res.status(401).end("access denied");
  } else {
    return res.status(401).end("access denied");
  }
  next();
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
      // generate a token and store it in a cookie
      const token = jwt.sign(username, secret);
      res.setHeader(
        "Set-Cookie",
        serialize("token", String(token), {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        }),
      );
      return res.end("user " + username + " has been signed in");
    });
  });
});

// curl -b cookie.txt -c cookie.txt  http://localhost:3000/signout/
app.get("/signout/", function (req, res, next) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", String(""), {
      path: "/",
      maxAge: 0, // expire now
    }),
  );
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
