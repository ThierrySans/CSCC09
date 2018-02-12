---
layout: default
permalink: /labs/06/
---

# User Authentication

In this lab, you are going to authenticate and authorize users to access our microblogging application. This will be done in three steps: 

1. store users' passwords when they sign up
1. authenticate users when they sign in and start a session
1. authorize users to perform specific tasks

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/06/microblog`. 

### Submission

Similarly to the previous lab, you should push your work to Github. 

## Storing and verifying passwords as salted hashes

In this first part, we are going to store users' passwords when they sign up. As seen in class, it is a very bad practice to store users' passwords in clear. Instead, users' passwords must be stored as salted hashes. 

In cryptography, a hash is a one-way function (i.e non invertible function) that deterministically maps a string such as a password (of an arbitrary size) to another one (of fixed size string). A salted hash uses a random data called a `salt` as additional input. The primary function of a salt is to defeat dictionary attacks and rainbow table attack by adding complexity (a.k.a entropy) to a password. 

In this lab, we will use the Node.js `crypto` standard library to generate random salts and a well known hash algorithm called `sha512` to turn a salt and a password into a salted hash. The following snippet of code shows how to create such a salted hash: 

```
const crypto = require('crypto');
var password = "secret"
var salt = crypto.randomBytes(16).toString('base64');
var hash = crypto.createHmac('sha512', salt);
hash.update(password);
var saltedHash = hash.digest('base64');
console.log(salt, saltedHash);
```

When a user signs up, the routing method `POST /signup/` receives the user's credentials and stores in the database.

**Task:** Modify the backend so that, when a user *signs up*, the application does not store the password but instead generates the salted hash of the password and stores it in the database.

When a user *signs in*, the routing method `POST /signin/` receives the user's credentials and compares the password with the one stored in the database. 

**Task:** Modify the backend so that, when a user *signs in*, the application verifies the password based on the salted hash stored in the database.

## Stateful authentication using sessions

The idea behind stateful authentication is that a user only need to authenticate once into the application to have all future requests authorized without providing his or her credential again. So far, we are able to authenticate users that sign in into our application, however, the stateful authentication is currently achieved by storing the username in the cookie. As seen in class, this mechanism is completely unsecured. 

Instead, we are going to store the username into a session. A session is a server-side storage system that binds a key/value pair store to requests coming from the same browser (by the intermediate of a session id stored in a cookie). To enable session, we will use a middleware for express.js called `express-session`:

```
$ npm install express-session --save
```

```
const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));
```

Once this middleware is enabled, one can read or write into the session as follows:

```
req.session.username = 'me';     // write they session key 'user' with the value 'me'
var username = req.session.username // read the session key 'username' into a variable
```

**Task:** Modify the backend so that, when a user *signs in* with the right credential, the application stores the user's profile into a session (in addition of storing in the cookie). 

So far, the application sets the variable `req.username` based on the cookie value for each HTTP request handled:

```
app.use(function (req, res, next){
    var cookies = cookie.parse(req.headers.cookie || '');
    req.username = (cookies.username)? cookies.username : null;
    console.log("HTTP request", req.username, req.method, req.url, req.body);
    next();
});
```

This is completely unsecured since anybody can craft an HTTP request with the right cookie and post messages on behalf of others. 

**Task:** Update this piece of code to set `req.username` to the username stored in the session rather than the one in the cookie. 

## Authorization

In this part, we want to enforce the following security policy for our *Microblog* application:

- non-authenticated and authenticated users can see all microblog messages
- only authenticated users can downvote and upvote messages
- an authenticated user can delete his/her own messages but not others

First, we can define a middleware to check whether an HTTP request is authenticated or not: 

```
var isAuthenticated = function(req, res, next) {
    if (!req.username) return res.status(401).end("access denied");
    next();
};
```

**Task:** Modify the existing api methods so that only authenticated users can create, update and delete messages.  

Yet, protecting the routing methods is not enough. As an example, it is currently possible for an authenticated user to delete a message posted by others. To convince yourself of such a vulnerability, try to authenticate as `mallory` and delete a message that was originally posted by `alice` (assuming that these two users have signed up into the application). 

```
$ curl -H "Content-Type: application/json" -X POST -d '{"username":"mallory","password":"pass4mallory"}' -c cookie.txt localhost:3000/signin/
$ curl -b cookie.txt -X DELETE localhost:3000/api/messages/a66mKb0o3pnnYig4/
```

**Task:** Modify the routing method `DELETE /api/messages/:id/` to patch that vulnerability. 

