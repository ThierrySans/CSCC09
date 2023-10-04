import { rmSync } from "fs";
import { compare, genSalt, hash } from "bcrypt";
import { createServer } from "http";
import express from "express";
import Datastore from "nedb";
import session from "express-session";
import { serialize } from "cookie";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let users = new Datastore({ filename: "db/users.db", autoload: true });
let items = new Datastore({
  filename: "db/items.db",
  autoload: true,
  timestampData: true,
});

app.use(
  session({
    secret: "please change this secret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(function (req, res, next) {
  const username = req.session.user ? req.session.user._id : "";
  res.setHeader(
    "Set-Cookie",
    serialize("username", username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    }),
  );
  next();
});

app.use(function (req, res, next) {
  // console.log("HTTP request", req.method, req.url, req.body);
  next();
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) return res.status(401).end("access denied");
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
            return res.redirect("/");
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
      req.session.user = user;
      res.setHeader(
        "Set-Cookie",
        serialize("username", user._id, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
        }),
      );
      return res.redirect("/");
    });
  });
});

// curl -b cookie.txt -c cookie.txt http://localhost:3000/signout/
app.get("/signout/", function (req, res, next) {
  req.session.destroy();
  res.setHeader(
    "Set-Cookie",
    serialize("username", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    }),
  );
  return res.redirect("/");
});

app.get("/api/items/", function (req, res, next) {
  items
    .find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .exec(function (err, items) {
      if (err) return res.status(500).end(err);
      return res.json(items.reverse());
    });
});

app.post("/api/items/", isAuthenticated, function (req, res, next) {
  items.insert(
    { content: req.body.content, owner: req.session.user._id },
    function (err, item) {
      if (err) return res.status(500).end(err);
      return res.json(item);
    },
  );
});

app.get("/api/items/:id/", function (req, res, next) {
  items.findOne({ _id: req.params.id }, function (err, item) {
    if (err) return res.status(500).end(err);
    if (!item)
      return res
        .status(404)
        .end("Item id #" + req.params.id + " does not exists");
    return res.json(item);
  });
});

app.delete("/api/items/:id/", isAuthenticated, function (req, res, next) {
  items.findOne({ _id: req.params.id }, function (err, item) {
    if (err) return res.status(500).end(err);
    if (item.owner !== req.session.user._id)
      return res.status(403).end("forbidden");
    if (!item)
      return res
        .status(404)
        .end("Item id #" + req.params.id + " does not exists");
    items.remove({ _id: item._id }, { multi: false }, function (err, num) {
      res.json(item);
    });
  });
});

app.use(express.static("static"));

// This is for testing purpose only
export function createTestDb(db) {
  items = new Datastore({
    filename: "testdb/items.db",
    autoload: true,
    timestampData: true,
  });
  users = new Datastore({
    filename: "testdb/users.db",
    autoload: true,
  });
}

// This is for testing purpose only
export function deleteTestDb(db) {
  rmSync("testdb", { recursive: true, force: true });
}

// This is for testing purpose only
export function getItems(callback) {
  return items
    .find({})
    .sort({ createdAt: -1 })
    .exec(function (err, items) {
      if (err) return callback(err, null);
      return callback(err, items.reverse());
    });
}

// This is for testing purpose only
export function getUsers(callback) {
  return users
    .find({})
    .sort({ createdAt: -1 })
    .exec(function (err, users) {
      if (err) return callback(err, null);
      return callback(err, users.reverse());
    });
}

export const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
