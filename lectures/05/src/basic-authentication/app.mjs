import { compare, genSalt, hash } from "bcrypt";
import { createServer } from "http";
import express from "express";
import Datastore from "@seald-io/nedb";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));

const users = new Datastore({ filename: "db/users.db", autoload: true });

function isAuthenticated(req, res, next) {
  // extract data from HTTP request
  if (!req.headers.authorization) return res.status(401).end("access denied");
  const encodedString = req.headers.authorization.split(" ")[1];
  const decodedString = Buffer.from(encodedString, "base64")
    .toString("ascii")
    .split(":");
  const username = decodedString[0];
  const password = decodedString[1];
  // retrieve user from the database
  users.findOne({ _id: username }, function (err, user) {
    if (err) return res.status(500).end(err);
    if (!user) return res.status(401).end("access denied"); // unknown user
    compare(password, user.hash, function (err, valid) {
      if (err) return res.status(500).end(err);
      if (!valid) return res.status(401).end("access denied"); //wrong password
      return next();
    });
  });
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
      if (err) return res.status(500).end(err);
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

// curl -u admin:pass4admin http://localhost:3000/private/
// curl http://admin:pass4admin@localhost:3000/private/
app.get("/private/", isAuthenticated, function (req, res, next) {
  return res.end("This is private");
});

// curl http://localhost:3000/public/
app.get("/public/", function(req, res, next) {
  return res.end("This is public");
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
