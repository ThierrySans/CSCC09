---
layout: default
permalink: /work/lab3/
---

# Lab 3 - Web API

In this lab, you are going to make our first steps building the backend. Your goal is to design the REST Web API for our Microblog application.

### Grading

**Important:** This homework has some starter code that is available on Classroom 50. If you do not have access to Classroom 50, please send a private message to the instructor on Piazza. 

You must show your work in-person to the TA during your assigned practical time or during the TA office hour.

## 1. Project Setup

To implement our Web API, we are going to use the [Express.js](http://expressjs.com/) framework
for _[Node.js](https://nodejs.org/en/)_. The _Node.js_ interpreter comes with a package manager
called _npm_ (Node package Manager). _npm_ makes easier installing modules and keeping track of dependencies
using a `package.json` file as explained [here](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

1. in your work directory for this lab, create a `package.json` file using the following (interactive) command:

   ```
   $ cd microblog
   $ npm init
   ```

2. install the `express` package (the option `--save` updates the `package.json` file accordingly):

   ```
   $ npm install --save express
   ```

3. install `mocha`, `chai` and `chai-http` as development packages. These packages will be use for development only and are not required to run the application in production.:

   ```
   $ npm install --save-dev mocha chai chai-http
   ```

4. In your `package.json`, change `main` and `scripts` as follows:

   ```
      "main": "app.mjs",
      "scripts": {
        "prod": "node app.mjs",   // for production
        "dev": "nodemon app.mjs", // for development
        "test": "npx mocha"      // for testing
      },
   ```

## 2. Implementing and testing a message API

In this part, we will implement a simple API to store our data and we are going to write unit tests for that feature. This API will follow the REST architecture defining operations over resources (collections and elements).

For instance, we can define 3 operations (create, read and delete) on messages as follows:

1. Create a message

   - Method: `POST`
   - URL: `/api/messages/`
   - Request body (JSON object): `{"content": "Hello World!", "author": "Me"}`
   - Response Body (JSON object): `{"id": 1, "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}`

1. Get the latest messages

   - Method: `GET`
   - URL: `/api/messages/`
   - Response body (JSON object): `{"messages": [{"id": 1, "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}, ...]}`

1. Delete a specific message

   - Method: `DELETE`
   - URL: `/api/messages/1/`
   - Response body (JSON object): `{"id": 1, "content": "Hello World!", "author": "Me", "upvote": 0, "downvote": 0}`

**Task:** Implement these API endpoints in `app.mjs`, add some unit tests in `test/app.mjs` and run those tests:

```
$ npm run test
```

## 3. Connecting the frontend and the backend

First, we will configure our app to serve both our existing frontend and the api using _Node.js_. To do so, we configured `app.mjs` to serve all frontend files statically:

 1. Import `path`

  ```javascript
  import path from "path";
  ```

2. configure express to serve static files from the directory called `static`

  ```
  app.use(express.static(path.resolve("static")));
  ```

3. run the application in development mode:

  ```
  $ npm run dev
  ```

At this point, you should see your app working well in the browser but everything is stored locally. Instead, we are going to modify our application to use our API. To do so, we will take advantage of the [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to push and pull JSON data from the API without refreshing the page.

Since sending messages using `fetch` is asynchronous, we need to adapt the frontend Javascript code to push and pull data asynchronously.

**Task:** Modify the frontend to store data in the backend instead of the local storage.

## 4. Fetching messages from time to time

At this point, the app should work well and, once the form is submitted, the latest messages should appear below. However, if the user does not submit any new message through the form, the application does not automatically fetch any new messages that might come from other users. To enable that, we need the frontend to query the backend for new messages from time to time and update the UI when new messages have arrived.

To implement such a feature, we can use a Javascript timer to trigger an action. For instance, the following example prints `Hello World!` after 2 sec (but only once).

```
setTimeout(function(e){
    console.log("Hello World!");
},2000);
```

**Task:** In the API, create a scheduler that retrieves all latest messages every 2 seconds.

## 5. Finalizing the application

**Task:** Finalize the application to handle upvote, downvote and delete as specified in _Microblog_ REST API\* file `doc/README.md`.

Before submitting make sure that everything works when running in production:

```
$ npm run prod
```
