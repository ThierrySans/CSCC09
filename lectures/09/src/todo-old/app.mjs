import { readFileSync } from "fs";
import { join } from "path";
import { createServer } from "https";
import express from "express";
import Datastore from "nedb";
import { serialize } from "cookie";
import session from "express-session";
import { compare, genSalt, hash } from "bcrypt";
import validator from "validator";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const users = new Datastore({ filename: join('db', 'users.db'), autoload: true });
const items = new Datastore({ filename: join('db', 'items.db'), autoload: true, timestampData : true});


app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, sameSite: true}
}));

// we use http for dev but https fpor production
if (app.get('env') === 'production') {
    session.cookie.secure = true;
}

app.use(function(req, res, next){
    let username = (req.session.username)? req.session.username : '';
    res.setHeader('Set-Cookie', serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.use(express.static('static'));

function isAuthenticated(req, res, next) {
    if (!req.session.username) return res.status(401).end("access denied");
    next();
};

function checkUsername(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

function sanitizeContent(req, res, next) {
    req.body.content = validator.escape(req.body.content);
    next();
}

function checkId(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) return res.status(400).end("bad input");
    next();
};

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/
app.post("/signup/", checkUsername, function (req, res, next) {
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
app.post("/signin/", checkUsername, function (req, res, next) {
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
      req.session.username = user._id;
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

app.get('/api/items/', function (req, res, next) {
    items.find({}).sort({createdAt:-1}).limit(5).exec(function(err, items) { 
        if (err) return res.status(500).end(err);
        return res.json(items.reverse());
    });
});

app.post('/api/items/', sanitizeContent, isAuthenticated, function (req, res, next) {
    items.insert({content: req.body.content, owner: req.session.username}, function (err, item) {
        if (err) return res.status(500).end(err);
        return res.json(item);
    });
});

app.get('/api/items/:id/', checkId, function (req, res, next) {
    items.findOne({_id: req.params.id}, function(err, item){
        if (err) return res.status(500).end(err);
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        return res.json(item);
    });    
});

app.delete('/api/items/:id/', isAuthenticated, checkId, function (req, res, next) {
    items.findOne({_id: req.params.id}, function(err, item){
        if (err) return res.status(500).end(err);
        if (item.owner !== req.session.username) return res.status(403).end("forbidden");
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        items.remove({ _id: item._id }, { multi: false }, function(err, num) {  
            res.json(item);
         });
    });    
});

const privateKey = readFileSync( 'server.key' );
const certificate = readFileSync( 'server.crt' );
const config = {
        key: privateKey,
        cert: certificate
};

createServer(config, app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTPS server on https://localhost:%s", PORT);
});