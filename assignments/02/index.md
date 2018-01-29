---
layout: default
permalink: /assignments/02/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr. 

# Building the backend

In this second assignment, you will concentrate on the backend. More specifically, you are going to build a Web API following the REST design principles. 

## Instructions

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB to build your back-end. Fee free to use any additional Node.js utility packages as needed. Make sure that all of these required packages are recorded in the `package.json` file. 

### Code quality and organization

All of your work should be placed into a directory called `app`. This directory should be organized as follows:

- `webgallery/app.js`: the main file
- `webgallery/package.json`: the Node.js package file
- `webgallery/static/`: your frontend developed for assignment 1 (HTML, CSS, Javascript and UI media files)
- `webgallery/db/`: the NeDB database files
- `webgallery/uploads/`: the uploaded files

Your code must be of good quality and follow all guidelines given during lectures and labs. For more details, please refer to the rubric. Remember, any code found online and improperly credited can constitute an academic violation. 

### Submission

You should submit your work to your Github course repository. Before submitting your final version. It is strongly recommended to verify that your code is portable. To do so: 

- push your work to Github
- clone it into a new directory
- install all packages with the single command `npm install` that will install all packages found in the `package.json` file
- start the app with the command `node app.js` (`nodejs` on Linux)
- start your app (suing `node` instead of `nodemon`) and verify that it works as expected

## Implementing the Web API

In this part, you are going to implement a Web API for your gallery. This api should follow the REST design principles seen in class. This means that the api should define CRUD operations (Create, Read, Update, Delete) on collections and elements. For your application, users should be able to:

- add a new image to the gallery either by uploading a file 
- retrieve and delete a given image 
- add a comment to a given image
- retrieve comments for a given image (a subset of comment at a time but not all comments at once) 
- delete a given comment

As the previous assignment, we provide a starter file called `api.js` for the **the Frontend API**. This api must be re-implemented. Instead of storing data locally, the *the Frontend API** should call the Web API using Ajax. Therefore, all api methods are now asynchronous and take a callback method as parameter. Your implementation of the **the Frontend API** will be auto-marked, so make sure to comply with the specifications. 

## Integrating the frontend

This part of the assignment is worth 10% only and builds on top of what you have already built for assignment 1.

In this part, you are going to update your frontend to work with the Web API. As done in assignment 1, this frontend must be a [Single-Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) that loads a single HTML webpage. This webpage is updated dynamically as the user interacts with it. The page does not reload nor transfer control to another page (except for the credits page that you keep separated). All features written for assignment 1 should be updated or completed to push and pull data from the API.

## Documenting the API

As shown in [lab 4]({{'labs/4/doc/' | absolute_url}}), write a documentation for your API (as a `README.md file) that contains, for each method, :
  
1. Description: a description of the method
1. Request: HTTP method (either POST, PUT, GET, PATCH or DELETE) and URL   
    - content-type: [optional] the [type of](http://www.iana.org/assignments/media-types/media-types.xhtml) the request body (by default it is raw text)
    - body: [optional] a precise description of the body
1. Response(s): the [HTTP status code](http://www.restapitutorial.com/httpstatuscodes.html)
    - content-type: [optional] the [type of](http://www.iana.org/assignments/media-types/media-types.xhtml) the response body (by default it is raw text)
    - body: [optional] a precise description of the body
1. Example: aan example of such an API query using `curl`







