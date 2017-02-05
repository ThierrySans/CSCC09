---
layout: default
permalink: /labs/6/
---

# Lab 6: User Authentication

In this lab, you are going to authenticate and authorize users to access our microblogging application. This will be done in three steps: 

1. store users' passwords when they sign up
1. authenticate users when they sign in
1. authorize users to perform specific tasks

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/6/microblog/app`. 

### Submission

You should push your work to Github at the end of your practical session. 

## Storing and verifying passwords as salted hashes

In this first part, we are going to store users' passwords when they sign up. As seen in class, it is a very bad practice to store users' passwords in clear. Instead, users' passwords must be stored as salted hashes. 

In cryptography, a hash is a one-way function (i.e non invertible function) that deterministically maps a string such as a password (of an arbitrary size) to another one (of fixed size string). A salted hash uses a random data called a `salt` as additional input. The primary function of a salt is to defeat dictionary attacks and rainbow table attack by adding complexity (a.k.a entropy) to a password. 

In this lab, we will use the Node.js `Crypto` standard library to generate random salts and a well known hash algorithm called `sha512` to turn a salt and a password into a salted hash. The following snippet of code shows how to create such a salted hash: 

```
var crypto = require('crypto');

var password = "secret"
var salt = crypto.randomBytes(16).toString('base64');
var hash = crypto.createHmac('sha512', salt);
hash.update(password);
var saltedHash = hash.digest('base64');
console.log(salt, saltedHash);
```

In our application, when a user signs up, the routing method `PUT /api/users/` does receive the user's password but does not store it in the database so far.

**Task:** Modify the backend so that, when a user *signs up*, the application generates the user's credential (salt and salted hash) and stores it in the database. To do so, follow these steps:

1. get the username and password from the request body
1. generate a new salt
1. compute the salted hash
1. store the username, the salt and the salted hash in the database (but not the password)

When a user signs in, the application receives the candidate username and password and should verify that the candidate password corresponds to the credential stored in the database for the given username. 

**Task:** Modify the backend so that, when a user *signs in*, the application verify the user's credential. To do so, follow these three steps:

1. get the username and password from the request body 
1. retrieves the known user's credential from the database
1. compute the salted hash based on the candidate password and the known salt
1. compare this result with the known salted hash

## Authentication using Sessions

The idea behind stateful authentication is that a user only need to authenticate once into the application to have all future requests authorized without providing his or her credential again. So far, we are able to authenticate users that sign in into our application but we do not remember it when other requests come in. 

A session is a server-side storage system that binds a key/value pair store to requests coming from the same browser (by the intermediate of a session id stored in a cookie). In this part, we will use sessions to remember whether a user has authenticate beforehand. To enable session, we will use a middleware for express.js called `express-session`:

```
$ npm install express-session --save
```

```
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
```

Once this middleware enabled, one can read or write into the session as follows:

```
session.username = 'me';        // write they session key 'user' with the value 'me'
var username = session.username // read the session key 'username' into a variable
```

**Task:** Modify the backend so that, when a user *signs in* with the right credential, the application stores the user's profile into a session. 

Once the user has signed in, we are now able to remember that such a user (or more precisely such browser) has been authenticated before by checking whether there is a corresponding user proifile stored in the session. Using Nodej.js, we can now define a new middleware (a.k.a request handler) to check that: 

```
var checkAuthentication = function(req, res, next) {
  ...
};
```

**Task:** Create a new middleware that checks whether a user has authenticated. This middleware: 

- either it returns a `403 forbidden` HTTP response when there is no user's profile stored in the session
- or it copies the user's profile stored in the session into `req.user` and forward this request to the next handler by calling `next()`

Now, we can use this middleware to protect any route that requires an authenticated user. 

**Task:** Modify the backend such that: 

- any user (including non-authenticated one) can read the message
- only authenticated can modify the user profiles
- only authenticated users can post new messages
- only authenticated users can upvote, downvote and delete messages


## Authorization

In this part, we will see that protecting the routing methods is enough. As an example, it is currently possible for an authenticated user to post a message on behalf of someone else since the message author is given as argument of the method `POST /api/messages`.

To convince yourself of such a vulnerability, try to authenticate as `mallory` and send a message as `alice` (assuming that these two users have signed up into the application). 

```
$ curl -X POST -d "username=mallory&password=pass4admin" -c cookie.txt http://localhost:3000/signin/
$ curl -X POST -d "username=alice&password=pass4admin" -d cookie.txt http://localhost:3000/api/messages/
```

To patch this vulnerability, we need to associate a message with the user making the request and ignore the argument. 

**Task:** Modify the routing method `POST /api/messages/` to patch that vulnerability. 

In a similar way, we would like a more fined-grained policy that says:

- an authenticated user can modify its profile but not others
- an authenticated user can delete his/her messages but not others

**Task:** Modify the routing methods to enforce that policy. 

