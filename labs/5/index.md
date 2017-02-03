---
layout: default
permalink: /labs/5/
---

# Lab 5: Storing Data

In this lab, you are going to manipulate files and connect our API to a database.

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/5/microblog/app`. 

### Submission

You should push your work to Github at the end of your practical session. 

## Uploading and storing files

In this part, we are going to upload user's profile picture to the server using Ajax.

When it comes to manipulating files, we have covered important aspects in class:

1. The only way to manipulate a file on the client side is to get a file handler (that contains the file data and metadata) from either a file input form or a drag'n drop element.
1. Files can be sent over HTTP by using either a form submit (default behaviour) or an Ajax request
1. An HTTP request that contains files must have its `content-type` (HTTP header) set to `multipart/form-data` to enable compression. 
1. Once stored on the server, these uploaded files should **not** be served statically. 

On the client side, we are going to use a `FormData` object to embed a file in an ajax request. If this `FormData` object contains one or several files, the ajax request will be sent with its `content-type` set to `multipart/form-data` automatically. If not, it will be `x-www-form-urlencoded`. 

```
var formdata = new FormData();
formdata.append(key, value);
... 
xhr.send(formdata);
```

**Task:** On the client-side, complete the function `updateUser` (model) that takes as argument the profile picture selected by the user and send it over HTTP using ajax (`PATCH /api/users/:username/`). 

On the server side, we need to do two things

1. store the uploaded file and its metadata
1. serve these uploaded files

We are going to use the express module [multer](https://github.com/expressjs/multer) to handle `multipart/form-data` requests and store uploaded files locally. First. install `multer` and update your app: 

```
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
```

Using `multer`, files are automatically stored in the `uploads` directory and the variable `req.body` contains all file metadata including filepath, name, size, mimetype and so on. 

```
app.patch(url, upload.single(key), function (req, res, next) {
     console.log(req.file);
});
```

**Task:** On the server-side, write two routing functions: 

1. `PATCH /api/users/:username/` that stores the user's profile picture and its metadata in the data store
1. `GET /api/users/:username/picture` that returns the profile picture with the correct mimetype. 

At this point, you should be able to upload a file through the app and display this file in the browser with the url `/api/users/:username/picture`. If the image is not displayed by the browser but downloaded instead, it means that the mimetype is wrongly set. 

## Using a database

In this part, we are going to store all data in a database rather than in memory (as done for the previous lab). 

We are going to use [NeDB](https://github.com/louischatriot/nedb), an embedded NoSQL database with an API similar to MongoDB. First. install `nedb` and update your app to create two databases: `messages` and `users`:

```
var Datastore = require('nedb')
  , messages = new Datastore({ filename: 'db/messages.db', autoload: true})
  , users = new Datastore({ filename: 'db/users.db', autoload: true });
``` 

**Task:** On the server-side, update all routing functions to store messages and users in these databases. For now, you are allowed to retrieve all messages and users if needed.  

## Pagination

In this part, we are going to optimize our database requests to avoid retrieving entire large collections. For instance, our application could store a large number of messages and it is not desirable to retrieve all at once when only the 10 latest ones are enough to populate our frontend page. 

In oder to retrieve the latest messages only, we are going to add a timestamp to all messages. First, clear the database (by simply removing the files) and then update the app to automatically add a timestamp to every new message.

```
var Datastore = require('nedb')
  , messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true})
  , users = new Datastore({ filename: 'db/users.db', autoload: true });
```

We are now able to write a database request to will retrieves that latests `n` messages by sorting messages based on their `createdAt` timestamp in decreasing order (`-1`): 

```
messages.find({}).sort({createdAt:-1}).limit(n).exec(function(err, data) { 

});
```

**Task:** On the server-side, update the routing function to retrieve the 10 latest messages only. 




