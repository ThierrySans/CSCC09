---
layout: default
permalink: /work/lab2/
---

# Lab 2 - Javascript

In this lab, you are going to make your first steps with Javascript. 

### Grading

**Important:** This homework has some starter code that is available on Classroom 50. If you do not have access to Classroom 50, please send a private message to the instructor on Piazza. 

You must show your work in-person to the TA during your assigned practical time or during the TA office hour.

### Recommended work setup

After cloning this repository, you are now ready to start working on the frontend of your application. Similarly to the previous lab, you should work with two windows on your screen: 1) the browser with your webpage and the developer's console opened, and 2) the code editor. For convenience, make sure that, when you save your code (using a keyboard shortcut), your page automatically refreshes in the browser.

## 1. Using a Javascript module instead of a generic javascript file

Our application _Microblog_ loads the javascript file `js/index.js`. This script defines a DOM event handler that is called when a user submits a message. So far, this code works (try it first).

However, we want to use a Javascript module instead of this outdated Javascript file. Javascript modules are better for three reasons:

- the are loaded asynchronously (faster loading)
- their execution is by default deferred after the DOM is fully loaded (no race condition)
- they use the strict mode that prohibit some code defects that could later become actual bugs

**Task:** Let's upgrade our javascript file to a javascript module. To do so:

1. Change the file name from `js/index.js` to `js/index.mjs`.
2. In `index.html` remove`<script src="js/index.js"></script>` at the end of the `body` element, and instead, add `<script type="module" src="js/index.mjs"></script>` in the `head` element.
3. Fix all errors and warnings that are now shown in the developers' console because of the strict mode of Javascript module.

## 2. Implementing upvote, downvote and delete

**Task:** Once the javascript module works again, complete the application to implement the upvote, downvote and delete features.

## 3. Using HTML5 Local storage for persistence

So far, any message added vanishes as soon as the page is refreshed. In the next lab, we will connect our application to a backend but for now let us experiment with the HTML5 local storage. This feature is particularly useful when building a web application with an offline mode. It allows each web application to store up to 10 mb of data on the browser. This data is stored as a collection of key-value pairs:

```
// store a value
localStorage.setItem(key, value);

// retrieve a value
localStorage.getItem(key);
```

However, HTML5 local storage can only store base types such as `int`, `float`, `boolean` and `string`. One way to go around that limitation is to store data structures such as arrays and objects as strings. To do this, we will use JSON to serialize and deserialize data. We will further explain JSON in the next lab.

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

**Task:** Create a javascript file called `js/api.mjs` with the following code that exports 3 functions `getMessages`, `addMessage` and `deleteMessage`:

```
/*  ******* Data types *******
    message objects must have at least the following attributes:
        - (String) messageId
        - (String) author
        - (String) content
        - (Int) upvote
        - (Int) downvote
****************************** */

// retrieve all messages
export function getMessages(){

}

// add a message
export function addMessage(author, content){

}

// delete a message given its messageId
export function deleteMessage(messageId){

}
```

**Task:** Secondly, import those functions in `js/index.mjs`:

```
import { getMessages, addMessage, deleteMessage } from `/js/api.js`
```

**Task:** Refactor upvote, downvote and delete following the same principles and make sure that all stored messages are displayed when the page is reloaded by the user.
