const crypto = require('crypto');
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const Datastore = require('nedb');
var users = new Datastore({ filename: 'db/users.db', autoload: true });

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

var isAuthenticated = function(req, res, next) {
    // extract data from HTTP request
    if (!(req.headers.authorization)) return res.status(401).end("access denied");
    var encodedString = req.headers.authorization.split(' ')[1];
    var decodedString = Buffer.from(encodedString, 'base64').toString("ascii").split(":");
    var username = decodedString[0];
    var password = decodedString[1];
    // retrieve user from the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!(user)) return res.status(401).end("access denied"); // unknown user
        if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); // invalid password
        return next();
    });
};

// curl -X POST -d "username=admin&password=pass4admin" http://localhost:3000/signup/
app.post('/signup/', function (req, res, next) {
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    var username = req.body.username;
    var password = req.body.password;
    // check if user already exists in the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        // generate a new salt and hash
        var salt = generateSalt();
        var hash = generateHash(password, salt);
        // insert new user into the database
        users.update({_id: username},{_id: username, hash: hash, salt: salt}, {upsert: true}, function(err){
            if (err) return res.status(500).end(err);
            return res.end("account created");
        });
    });
});

// curl -u admin:pass4admin http://localhost:3000/private/
// curl http://admin:pass4admin@localhost:3000/private/
app.get('/private/', isAuthenticated, function (req, res, next) {
    return res.end("This is private");
});

// curl http://localhost:3000/public/
app.get('/public/', function (req, res, next) {
    return res.end("This is public");
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
