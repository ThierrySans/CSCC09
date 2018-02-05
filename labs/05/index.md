---
layout: default
permalink: /labs/05/
---

# Storing Data

In this lab, you are going to manipulate files and connect our API to a database.

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/05/microblog`. 

### Submission

Similarly to the previous lab, you should push your work to Github. 

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

In this part, we are going to optimize our database requests to avoid retrieving entire large collections. For instance, our application could store a large number of messages and it is not desirable to retrieve all at once when only the 5 latest ones are enough to populate our frontend page. 

In oder to retrieve the latest messages only, we are going to add a timestamp to all messages. First, clear the database (by simply removing the files) and then update the app to automatically add a timestamp to every new message.

```
var Datastore = require('nedb')
  , messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true})
  , users = new Datastore({ filename: 'db/users.db', autoload: true });
```

We are now able to write a database request to will retrieves that latests `n` messages by sorting messages based on their `createdAt` timestamp in decreasing order (`-1`): 

```
messages.find({}).sort({createdAt:-1}).limit(10).exec(function(err, data) { 

});
```

**Task:** On the server-side, update the routing function to retrieve the 10 latest messages only. 

## Uploading and storing files

To add a user, the frontend sends a POST request to `/api/users/` with the `username` and `picture` using a form (no Ajax yet): 

```
<form class="complex_form" id="signup" action='/api/users/' method="POST">
  <div class="form_title">Add a user</div>
  <input type="text" name="username" class="form_element" placeholder="Enter a username" required/>
  <input type="file" name="picture" class="form_element" required/>
  <input type="submit" class="btn"/>
</form>
```

Once the form is submitted, the backend receives these two attributes and stores them. However, you should notice the value of the attribute `picture` is not the file itself but just the filename given as a string. 

```
app.post('/api/users/', function (req, res, next) {
    console.log(req.file);
    // store req.file in the database
    res.redirect('/');
});
```

This is actually useless as it is. Assuming that the backend is running on a different machine, it does not have access to this file content. Instead of sending the filename as a string, the frontend should send the file content in the body of the HTTP request. Thus, the backend can read the file from the request and store it locally on the backend. Finally, the backend can get this image back when needed. 

To implement that feature, we need:

1. modify the frontend to send the image content with the POST request by setting the content type of the form to `multipart/form-data` to enable compression. 

```
<form class="complex_form" id="signup" action='/api/users/' method="POST" enctype="multipart/form-data">
```

2. modify the backend to extract the file from the HTTP request, store the file itself in the directory called `uploads` a. 

```
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.post('/api/users/', upload.single('picture'), function (req, res, next) {
    console.log()
    // store req.file in the database
    res.redirect('/');
});
```

Once the user's profile image is stored on the backend, we would like to show that image in the frontend instead of the default one in the DOM. 

```
<img class="message_picture" src="media/user.png" alt="${message.username}">
```

Therefore, we need to replace `media/user.png` by the url of the image freshly downloaded.

The easier but bad solution move the directory `upload` directory in the static directory so that express serves user's image in the same way as it serves UI icons for instance. This is not a good idea in general First, t is not a good practice and , secondly, it will be impossible to restrict the access to these images to authenticated users only later on. 

A better solution is to serve the file dynamically. In our backend, retrieving a user's profile image is a `GET /api/users/:username/profile/picture/` that returns an image file with its appropriate content-type. 

```
app.get('/api/users/:username/profile/picture/', function (req, res, next) {
    if (!(req.params.username in users)) res.status(404).end('username ' + username + ' does not exists');
    else{
        var profile = /* retrieve the user's profile from the database */
        res.setHeader('Content-Type', profile.mimetype);
        res.sendFile(profile.path);
    }
});
```

Finally, we can change the frontend to download this file automatically:

```
<img class="message_picture" src="/api/users/${message.username}/profile/picture/" alt="${message.username}">
```



