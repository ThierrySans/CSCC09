---
layout: default
permalink: /labs/03/
---

# Javascript

###  Recommended work setup

Similarly to previous lab, you can work on your own laptop or on any linux lab machine. This lab has a starter code that can be found on the course Github repository `/labs/03/microblog`. Therefore, we recommend you to copy the starter code into your Github repository and work from there. 

Indeed, you do need to clone the repositories again if you have already done so for the previous lab. Instead you can update them: 

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

1. copy today's lab into your repository: 
    
    ```
    $ mkdir -p _your_email_prefix_/labs/03/
    $ cp -R CSCC09/labs/03/microblog _your_email_prefix_/labs/03/
    ```

1. move to today's lab starter code:

    ```
    $ cd _your_email_prefix_/labs/03/microblog
    ```

1. start browser-sync to monitor the starter code directory:

    ```
    $ browser-sync start --server --no-online --files="**/*"
    ```

### Submission

Similarly to the previous lab, you should push your work to Github. 

## 1. Writing good javascript code

In this first part, our application *Microblog* loads the javascript file `js/script.js`. This script defines a DOM event handler that is called when a user submits a message. So far, this code works however it contains some defects that can become bugs as our application grows. Before adding more code, we want to correct and improve that given starter code. 

**Task:** First, encapsulate the code into a closure and add the `use strict` flag as show below. Tests the code and correct all warnings and errors that might rise. 

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

**Task:** Finally, let us improve the loading of Javascript:

1. For better efficiency (and whenever it is possible), it is recommended to load javascript code at the end of the body instead of loading it in the header. By doing so, the browser will start rendering the DOM before loading the script.
2. To avoid race conditions, any piece of javascript code that works with the DOM must be executed once the DOM has been fully loaded. In our application, attaching an event handler to the form might not work if the DOM is not loaded when the script executes. Therefore, we should encapsulate that piece of code with a `window.onload`. 
    
    ```
    window.onload = function(){
        document.addEventListener(...
        ...
    }
    ```

## 2. Upvote, downvote and delete

**Task:** Complete the application to implement the upvote, downvote and delete features.

## 3. HTML5 Local storage

So far, any message added vanishes as soon as the page is refreshed. In the next lab, we will connect our application to a backend but for now let us experiment with the HTML5 local storage. This feature is particularly useful to build web application with an offline mode. It allows each web application to store up to 10 mb of data on the browser. This data is stored as a collection of key-value pairs:

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

**Task:** Complete the application to load and store messages locally. This means that:

1. when the user opens the page page, the page loads existing messages from the local store (if any)
2. when a new message is added, upvoted, down-voted or deleted, the data store is updated accordingly 

## 4. Refactoring into a frontend API

In this part, we are going to refactor the code to separate it into two parts:

- **Frontend Controller** (`index.js`) controls the UI
- **Frontend API** (`api.js`) provides an API to push/pull data (to the local storage for now)

The idea is to delegate all data storage and retrieval to the **Frontend API**. Doing this will be useful later when we are going to work with a backend, this**Frontend API** will be in charge of pushing and pulling data to the server. 

**Task:** Let's make a first attempt at refactoring our code by refactoring the process of creating new messages: 

1. Complete the **Frontend API** (`api.js`). This program exposes a variable called `api` globally:  

2. Update the **Frontend Controller** to call the api to push and pull data 
    
**Task:** Refactor upvote, downvote and delete following the same principles and make sure that all stored messages are displayed when the page is reloaded by the user. 

