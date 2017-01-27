---
layout: default
permalink: /labs/4/
---

# Lab 4: Web API

In this lab, you are going to make our first steps building the backend. Your goal is to design the REST Web API for our Microblog application. 

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/4/microblog`. However, it is recommended not to copy everything into your work directory yet. We will do that towards the end of this lab. For now, we can just update the course repository and create the work directory for this lab. 

1. update the course repository:
    
    ```
    $ cd cscc09-w17
    $ git pull
    ```

1. update your own repo:
    
    ```
    $ cd _your_utorid_
    $ git pull
    ```

1. create the work directory
    
    ```
    $ mkdir -p _your_utorid_/labs/4/
    ```
    
1. copy the `app.js` skeleton provided to you for this lab: 

    ```
    $ cp -R cscc09-w17/labs/4/app.s _your_utorid_/labs/4/
    ```

### Submission

You should push your work to Github at the end of your practical session. 


## Creating the Web API

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

## Testing the Web API (the simple way)

To test our api, we are going to use the program `curl`. For instance, our api should answer to this command: 

``` 
$ curl --verbose --request POST --header 'Content-Type: application/json' --data '{"content": "Hello World!", "author": "Me"}' http://localhost:3000/
``` 

This command sends an HTTP requests to our server with the following parameters:

- Method: `POST`
- Url: `/`
- JSON header: `Content-Type: application/json`
- Request body (as a string): `{"content": "Hello World!", "author": "Me"}`

As defined in `app.js`, it returns an HTTP response with the following parameters:

- Status code: `200`
- Header: `Content-Type: application/json`
- Body (as a string): `{"content": "Hello World!", "author": "Me"}`

To test our application, we can write a simple shell script that initiates a series of `curl` commands:

 ``` 
 #!/bin/bash
 
 curl --request POST --header "Content-Type: application/json" --data '{"content":"Hello World!","author":"Me"}'
 ...
 ```
 
## Implementing and testing a message API

In this part, we will implement a simple API to store our data. This API will follow the REST architecture defining operations over ressources (collections and entities). 

For instance, we can define 3 operations (create, read and delete) on messages as follows: 

1. Create a message

    - Method: `POST`
    - Url: `/api/messages/`
    - Request body  (JSON object): `{"content": "Hello World!", "author": "Me"}`
    - Response body (JSON object): `{"id": 48}`
    
1. Get all messages

    - Method: `GET`
    - Url: `/api/messages/`
    - Response body (JSON list): `[{"content": "Hello World!", "author": "Me"}, ...]`
    
1. Delete a specific message

    - Method: `DELETE`
    - Url: `/api/messages/:id/`
    - Response body (JSON object): `{"id": 48}`

**Task:** Implement and test this API. 

## Connecting the frontend and the backend

First, we will configure our app to serve both our existing frontend and the api using *Node.js*. 

1. move all frontend files into a directory called `frontend`:
    
    ```
    $ mkdir -p _your_utorid_/labs/4/frontend/
    $ cp -R cscc09-w17/labs/4/microblog/* _your_utorid_/labs/4/frontend/*
    ```
    
1. configure `app.js` to serve all frontend files statically:

    ```
    var express = require('express')
    var app = express();
    
    app.use(express.static('frontend'));
    ...
    ```

At this point, you should see your app working well in the browser but everything is stored locally. Instead, we are going to modify our application to use our API. To do so, we will take advantage of [ajax](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) to push and pull JSON data from the API without refreshing the page.

```
var method = ???    // either POST, PUT, GET, PATCH, DELETE
var url = ???       // the full url http:// ...
var body = ???      // should be set to null for GET and DELETE
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE){
        console.log(JSON.parse(this.status, this.statusthis.responseText));
    }
};
xhr.open(method, url, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(body);
```

**Task:** Modify the frontend to avoid storing data in the model (neither in memory or in the HTML5 local storage): 

1. replace the function `init` (model) by a function `getMessages` that retrieves all messages from the API. Once this is done, dispatch an event `messageUpdated`. 
1. modify the function `createMessage` (model) to push the message to the API. Once this is done, dispatch an event `messageCreated`. 
1. modify the function `deleteMessage` (model) to delete the message on the API. Once this is done, dispatch an event `messageUpdated`.
1. Update the controller to take all of these changes into account.

At this point, the app should work well and, once the form is submitted, the new messages should appear below. However, if the user does not submit any new message through the form, the application does not automatically fetch any new messages that might come from other users. To enable that, we need the model to query the API about new messages from time to time and notify the controller when new messages have arrived. 

To implement such a feature, we can use a Javascript timer to trigger an action. For instance, the following example prints `Hello World!` after 2 sec (but only once).

```
setTimeout(function(e){
    console.log("Hello World!");
},2000);
```

**Task:** In the model, create a scheduler that retrieves all new messages every 2 seconds and dispatch an event `messageUpdated`. 

## Finalizing the application

**Task:** Finalize the application to handle up vote and down vote. 




