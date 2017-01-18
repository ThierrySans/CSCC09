---
layout: default
permalink: /labs/3/
---

# Lab 3: Javascript

In this lab, you are going to learn how to build front-ends using Javascript. Your goal is to get familiar with the MVC design pattern (Model-View-Controller). 

###  Recommended work setup

Similarly to Lab 2, you can work on your own laptop or on any linux lab machine. This lab has a starter code that can be found on the course Github repository `/labs/3/microblog`. Therefore, we recommend you to copy the starter code into your Github repository and work from there. 

Indeed, you do need to clone the repositories again if you have already done so for lab 2. Instead you can update them: 

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

1. copy today's lab into your repository: 
    
    ```
    $ mkdir -p _your_utorid_/labs/3/
    $ cp -R cscc09-w17/labs/3/ _your_utorid_/labs/3/
    ```

1. move to today's lab starter code:

    ```
    $ cd _your_utorid_/labs/3/microblog
    ```

1. start browser-sync to monitor the starter code directory:

    ```
    $ browser-sync start --server --no-online --files="**/*"
    ```

### Submission

Similarly to lab 2, you should push your work to Github at the end of your practical session. 

## 1. Writing good javascript code

In this first part, our application *Microblog* loads the javascript file `js/script.js`. This script defines a DOM event handler that is called when a user submits a message. So far, this code works however it contains some defects that can become bugs as our application grows. Before refactoring the entire code into an MVC, we want to correct and improve that specific piece of code. 

**Task:** Encapsulate the code into a closure and add the `use strict` flag as show below. Tests the code and correct all errors that might rise. 

```
(function(){
    "use strict";
    
    // your code goes here
    
}());
```

**Task:** Use JSHint to find all potential problems with your javascript code and correct them all. To help you understand the error messages, Google is your friend. 

```
$ jshint js
```

## 2. Model-View-Controller

In this part, we are going to refactor the code provided in `js/script.js` into an homemade MVC structure:

- **Model** - deals with the data
    - Provides an API to the controller to push/pull data
    - Notifies the controller when data are updated
- **View** - deals with the UI (DOM)
    - Provides an API to the controller to push/pull data from/to the UI
    - Notifies the controller when user inputs are received
- **Controller** - deals with the model and the view
    - Listen to notifications coming from the model and the view
    - But does not deal with data nor UI

In our example, this MVC structure would work as follows:

1. when the form is submitted, the view reads the message and notifies the controller 
1. the controller receives the new message and calls the model API to store that message
1. once the data is stored, the model notifies to the controller
1. the controller receives the new message and calls the view API to insert the message into the UI

In this scenario, they are two important mechanisms to implement in Javascript: 

- exposing and calling an API with a namespace of your choice:  

    ```
    // exposing an API with the namespace 'api'
    var api = (function(){
        "use strict";
    
        var api = {};
    
        api.foo = function(){
            console.log("FOO");
        };
    
    }());

    // calling the api
    api.foo();
    ```

- sending and receiving notifications with labels of your choice: 

    ```
    // listening to any event labeled 'onSomething'
    document.addEventListener('onSomething', function(e){
         console.log(e.detail);
    });

    // creating and dispatching an event labeled 'onSomething'. 
    var event = new CustomEvent('onSomething',{ e.detail: 'Hello World!});
    document.dispatchEvent(event);
    ```
    
Refactoring our code into our MVC structure is not simple. It is a bad idea to write a lot of code and test everything at once. Instead, proceed step and step and insert debugging messages after each step to make sure that things are correctly set. 

**Task:** Refactor the code by following this recipe: 

0. Modify `index.html`, to load `model.js`, `view.js` and `controller.js` instead of `script.js`. 

1. In the view, create a DOM event handler that, when the form is submitted,:
    - reads the message (username + content) from the form
    - notifies the controller by raising an event labeled `onFormSubmit` with the message attached

1. In the model, create an API method called `createMessage` that: 
    - stores the message locally
    - notifies the controller by raising an event labeled `onNewMessage` with the new message attached
    
1. In the controller, create a listener that, when the event `onFormSubmit` is received,:
    - reads the message from the event
    - calls the model API method `createMessage`

1. In the view, create a method `insertMessage` that inserts a message into the UI (DOM)
    
1. In the controller, create a listener that, when the event `onNewMessage` is received,:
    - reads the message from the event
    - calls the view API method `insertMessage`

## 3. Upvote and downvote

**Task:** Complete the application to implement the upvote and downvote feature following our MVC structure. 

## 4. HTML5 Local storage

So far, any message added vanishes as soon as the page is refreshed. In the next lab, we will connect our application to a backend but for now let us experiment with the HTML5 local storage. This feature is particularly useful to build web application with an offline mode. It allows each web application to store up to 5 mb of data on the browser. This data is stored as a collection of key-value pairs:

```
// store a value
localStorage.setItem(key, value);

// retrieve a value
localStorage.getItem(key);
```

However, HTML5 local storage can only store base types such as `int`, `float`, `boolean` and `string`. One way to go around that limitation is to store data structure such as arrays and objects as strings. To do, we will use JSON to serialize and deserialize data. We will further explain JSON in the next lab. 

```
// store an object (or an array)
localStorage.setItem(key, JSON.stringify(object));

// retrieve an object (or an array)
JSON.parse(localStorage.getItem(key));
```

**Task:** Complete the application to load and store messages locally following our MVC structure. This means that:

1. when the user opens the page page (`window.onload`), the model should load the whether there are messages stored locally (if any)

1. when a new message is added, the model should update the local storage with the new message. 







