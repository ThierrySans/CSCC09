---
layout: default
permalink: /assignments/03/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr. 

# Managing users and Security

In this last assignment, you will concentrate on managing the users. 

## Instructions

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB to build your back-end. Fee free to use any additional Node.js utility packages as needed. Make sure that all of these required packages are recorded in the `package.json` file. 

### Code quality and organization

All of your work should be placed into a directory called `webgallery`. This directory should be organized as follows:

- `webgallery/app.js`: the main file
- `webgallery/package.json`: the Node.js package file
- `webgallery/frontend/`: your frontend (HTML, CSS, Javascript and UI media files)
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

While refactoring your application, you might want to re-design your REST api to reflect the fact that image galleryes are owned by users.  

As the previous assignment, we provide a starter file called `api.js` for the **the Frontend API**. This api must be refactored and completed. Your implementation of the **the Frontend API** will be auto-marked, so make sure to comply with the specifications. 

## Integrating the frontend

This part of the assignment is worth 10% only and builds on top of what you have already built for assignment 2. Update your current frontend to reflect all changes made above. The homepage should now a paginated list of all galleries that can be browsed. Users should be able to sign-up, sign-in and sign-out into the application and do no longer need to enter their username when adding images and comments.

## Documenting the API

As done in assignment 2, update your API documentation to reflect the API changes made above. 



  










