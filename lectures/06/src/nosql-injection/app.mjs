import { createServer } from "http";
import express from "express";
import Datastore from "nedb";
import session from "express-session";

const PORT = 3000;
const app = express();

app.use(express.json());

const users = new Datastore({ filename: 'db/users.db', autoload: true });

app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    next();
});

function isAuthenticated(req, res, next) {
    if (!req.user) return res.status(401).end("access denied");
    next();
};

// curl -X POST -d '{"username":"admin","password": "pass4admin"}' -H "Content-Type: application/json" http://localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
    users.insert(req.body, function (err, user) {
        return res.end("account created");
    });
});

// curl -X POST -d '{"username":"admin","password": {"$gt": ""}}' -H "Content-Type: application/json" -c cookie.txt http://localhost:3000/signin/
app.post('/signin/', function (req, res, next) {
    users.findOne({username: req.body.username, password: req.body.password}, function(err, user){
        if (!(user)) return res.status(401).end("access denied");
        req.session.user = user;
        return res.end("user " + req.body.username + " has been signed in");
    });
});

// curl -b cookie.txt http://localhost:3000/private/
app.get('/private/', isAuthenticated, function (req, res, next) {
    return res.end("This is private");
});

createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});