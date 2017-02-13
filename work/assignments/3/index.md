---
layout: default
permalink: work/assignments/3/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr. 

# Assignment 3: Managing users and Security

In this last assignment, you will concentrate on managing the users and securing your application. 

## Instructions

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB to build your back-end. Fee free to use any additional Node.js utility packages as needed. Make sure that all of these required packages are recorded in the `package.json` file. 

### Code quality and organization

All of your work should be placed into a directory called `app`. This directory should be organized as follows:

- `app/app.js`: the main file
- `app/package.json`: the Node.js package file
- `app/frontend/`: your frontend (HTML, CSS, Javascript and UI media files)
- `app/db/`: the NeDB database files
- `app/uploads/`: the uploaded files

Your code must be of good quality and follow all guidelines given during lectures and labs. For more details, please refer to the rubric. Remember, any code found online and improperly credited can constitute an academic violation. 

### Marking 

In addition to submitting the app, students must fill and submit the grading rubric for this assignment. This grading rubric is decomposed as follows: 

- **Authenticated Users and Multiple Galleries**: 50 points
- **API security**: 20 points
- **Frontend update**: 10 points
- **API Documentation**: 5 points
- **Code quality and organization** 15 points

### Submission

You should submit 1) the app, 2) its updated documentation and 3) the grading rubric through your Github course repository. Your repository should be organized as follows:

- `assignment/3/app` 
- `assignment/3/README.md`
- `assignment/3/rubric.md`

Before submitting your final version. It is strongly recommended to verify that your code is portable. To do so: 

1. push your work to Github
1. clone it into another machine
1. install all packages with the single command `npm install` that will install all packages found in the `package.json` file
1. start the app with the command `node app.js` (`nodejs` on Linux)
1. verify that your app works as expected

## Authenticated Users and Multiple Galleries

In this part, you are going to extend your API to support authenticated users and multiple galleries. Each user will now has his/her own gallery. Users will be authenticated through the API (local authentication based on sessions). In addition of supporting these feature, access to the API is ruled by the following authorization policy: 

- Non authenticated cannot read any picture nor comment
- Non-authenticated can sign-up and sign-in into the application
- Authenticated users can sign-out of the application
- Authenticated users can browse any gallery
- Gallery owners can upload and delete pictures to their own gallery only
- Authenticated users can post comments on any picture of any gallery
- Authenticated users can delete any one of their own comments but not others
- Gallery owners can delete any comment on any picture from their own gallery

## Web Security

In this part, your are going to strengthen the security of your API: 

1. Enable HTTPS to prevent eavesdropping and spoofing attacks 
2. Validate and sanitize all users' inputs to prevent content spoofing and cross-site scripting attacks
3. Secure the cookies to prevent mixed-content attacks

## Integrating the frontend

In this part, you are going to integrate your API with a frontend. For the frontend, you have the choice between two options: 

1. Update your current frontend to reflect all changes made above. The homepage should now a paginated list of all galleries that can be browsed. Users should be able to sign-up, sign-in and sign-out into the application and do no longer need to enter their username when adding images and comments. While browsing the galleries, the URL should reflect the owner's name and the image ID of the gallery currently browsed. 
1. Provide a callback-based API for your frontend and write a unit tester for it (similar to lab 6 example). 

## Documenting the API

As done in assignment 2, update your API documentation to reflect the API changes made above. 



  










