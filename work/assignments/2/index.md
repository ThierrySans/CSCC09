---
layout: default
permalink: work/assignments/2/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr. 

# Assignment 2: Building the Web API

In this second assignment, you will concentrate on the back-end. More specifically, you are going to build a Web API following the REST design principles. 

## Instructions

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB to build your back-end. Fee free to use any additional Node.js utility packages as needed. Make sure that all of these required packages are recorded in the `package.json` file. 

### Code quality and organization

All of your work should be placed into a directory called `app`. This directory should be organized as follows:

- `app/app.js`: the main file
- `app/package.json`: the Node.js package file
- `app/frontend/`: your frontend developed for assignment 1 (HTML, CSS, Javascript and UI media files)
- `app/db/`: the NeDB database files
- `app/uploads/`: the uploaded files

Your code must be of good quality and follow all guidelines given during lectures and labs. For more details, please refer to the rubric. Remember, any code found online and improperly credited can constitute an academic violation. 

### Marking 

In addition to submitting the app, students must fill and submit the grading rubric for this assignment. This grading rubric is decomposed as follows: 

- **API Implementation**: 50 points
- **Frontend Integration**: 30 points
- **API Documentation**: 20 points
- **Code quality and organization** 20 points

### Submission

You should submit your 1) app, 2) its documentation and 3) its grading rubric through your Github course repository. Your repository should be organized as follows:

- `assignment/2/app` 
- `assignment/2/README.md`
- `assignment/2/rubric.md`

Before submitting your final version. It is strongly recommended to verify that your code is portable. To do so: 

1. push your work to Github
1. clone it into another machine
1. install all packages with the single command `npm install` that will install all packages found in the `package.json` file
1. start the app with the command `node app.js` (`nodejs` on Linux)
1. verify that your app works as expected

## Implementing the Web API

In this part, you are going to implement a Web API for your gallery. This api should follow the REST design principles seen in class. This means that the api should define CRUD operations (Create, Read, Update, Delete) on collections and elements. For your application, users should be able to:

- add a new image to the gallery either by uploading a file or providing an url 
- retrieve and delete a given image 
- add a comment to a given image
- retrieve comments for a given image (a subset of comment at a time but not all comments at once) 
- delete a given comment

As discussed in class, your application should be able to serve multiple and concurrent requests.

## Integrating the frontend

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







