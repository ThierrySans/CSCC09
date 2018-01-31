---
layout: default
permalink: /labs/04/
---

# Web API

In this lab, you are going to make our first steps building the backend. Your goal is to design the REST Web API for our Microblog application. 

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/04/microblog`.

1. update the course repository:
    
    ```
    $ cd CSCC09
    $ git pull
    ```

1. update your own repo:
    
    ```
    $ cd _your_email_prefix_
    $ git pull
    ```

1. create the work directory
    
    ```
    $ mkdir -p _your_email_prefix_/labs/04/
    ```
    
1. copy today's lab into your repository: 

    ```
    $ cp -R CSCC09/labs/04/microblog _your_email_prefix_/labs/04/
    ```

1. move to today's lab starter code:

    ```
    $ cd _your_email_prefix_/labs/04/microblog
    ```

### Submission

Similarly to the previous lab, you should push your work to Github. 


## 1. Creating the Web API

To implement our Web API, we are going to use the [Express.js](http://expressjs.com/) framework for *[Node.js](https://nodejs.org/en/)*. The *Node.js* interpreter comes with a package manager called *npm* (Node package Manager). *Npm* makes easier installing modules and keeping track of dependencies using a `packages.json` file as explained [here](https://www.tutorialspoint.com/nodejs/nodejs_npm.htm).

1. in your work directory for this lab, create a `package.json` file using the following (interactive) command: 

    ```
    $ npm init
    ```

1. install the `express` module (the option `--save` updates the `packages.json` file accordingly): 

    ```
    $ npm install express --save
    ```
    
1. install the `body-parser` module: 

    ```
    $ npm install body-parser --save
    ```


1. Start your application using the node.js command that is either `node` (MacOS) or `nodejs` (linux).

    ```
    $ node app.js
    ```

1. Alternatively, you can use [nodemon](https://nodemon.io/) to reload your application when changes are detected:

    ```
    $ nodemon app.js
    ```

## 2. Testing the Web API using Curl

To test our api, we are going to use the program `curl`. For instance, our api should answer to this command: 

``` 
$ curl --verbose --request POST --header 'Content-Type: application/json' --data '{"content": "Hello World!", "author": "Me"}' http://localhost:3000/
``` 

This command sends an HTTP requests to our server with the following parameters:

- Method: `POST`
- Url: `/`
- Header: `Content-Type: application/json`
- Body (as a string): `{"content": "Hello World!", "author": "Me"}`

As defined in `app.js`, it returns an HTTP response with the following parameters:

- Status code: `200`
- Header: `Content-Type: application/json`
- Body (as a string): `{"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}`

To test our application, we can write a simple shell script that initiates a series of `curl` commands:

 ``` 
 #!/bin/bash
 
 curl --request POST --header "Content-Type: application/json" --data '{"content":"Hello World!","author":"Me"}'
 ...
 ```
 
## 3. Implementing and testing a message API

In this part, we will implement a simple API to store our data. This API will follow the REST architecture defining operations over ressources (collections and entities). 

For instance, we can define 3 operations (create, read and delete) on messages as follows: 

1. Create a message

    - Method: `POST`
    - Url: `/api/messages/`
    - Request body  (JSON object): `{"content": "Hello World!", "author": "Me"}`
    - Body (JSON object): `{"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}`
    
1. Get the latest messages

    - Method: `GET`
    - Url: `/api/messages/`
    - Response body (JSON list): `[{"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}, ...]`
    
1. Delete a specific message

    - Method: `DELETE`
    - Url: `/api/messages/xy6r3kt45/`
    - Response body (JSON object): `{"_id": "xy6r3kt45", "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}`

**Task:** Implement and test this API. 

## 4. Connecting the frontend and the backend

First, we will configure our app to serve both our existing frontend and the api using *Node.js*. 

1. move all frontend files into a directory called `static`:
    
    ```
    $ mkdir -p _your_email_prefix_/labs/04/static/
    $ cp -R CSCC09/labs/04/microblog/* _your_email_prefix_/labs/04/static/*
    ```
    
1. configure `app.js` to serve all frontend files statically:

    ```
    const express = require('express')
    const app = express();
    
    app.use(express.static('static'));
    ...
    ```

At this point, you should see your app working well in the browser but everything is stored locally. Instead, we are going to modify our application to use our API. To do so, we will take advantage of [ajax](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) to push and pull JSON data from the API without refreshing the page.

Here is an example of a function to send Ajax requests with data body encoded in JSON (when necessary). this function is asynchronous meaning that it does not return a value but instead uses a callback method to process the result (or the error). 

```
function send(method, url, data, callback){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
        else callback(null, JSON.parse(xhr.responseText));
    };
    xhr.open(method, url, true);
    if (!data) xhr.send();
    else{
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
}
```

Since sending messages using Ajax is asynchronous, we need to adapt the frontend Javascript code to push and pull data asynchronously.

**Task:** Modify the frontend to store data in the backend instead of the local storage:

1. in the api, update the method `addMessage` to call send instead of storing data locally.

```
module.addMessage = function(author, content, callback){
    // your code goes here
}
```

2. in the controller, update the piece of the code that calls `module.addMessage`. 

## 5. Fetching messages from time to time

At this point, the app should work well and, once the form is submitted, the latest messages should appear below. However, if the user does not submit any new message through the form, the application does not automatically fetch any new messages that might come from other users. To enable that, we need the frontend to query the backend for new messages from time to time and update the UI when new messages have arrived. 

To implement such a feature, we can use a Javascript timer to trigger an action. For instance, the following example prints `Hello World!` after 2 sec (but only once).

```
setTimeout(function(e){
    console.log("Hello World!");
},2000);
```

**Task:** Create a scheduler that retrieves all latest messages every 2 seconds. 

## 6. Finalizing the application

**Task:** Finalize the application to handle upvote, downvote and delete as specified in the [*Microblog* REST API](./doc) 




