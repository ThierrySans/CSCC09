---
layout: default
permalink: /work/hw2/
---

# Hw 2 - Building the Web Gallery Backend

The objective of these assignments is to build an application called _The Web Gallery_ where users can share pictures and comments. This application is similar to existing web applications such as Facebook, Instagram or Google Photos.

In this second assignment, you will concentrate on the backend. More specifically, you are going to build a Web API following the REST design principles.

##  Deployment

For this homework, we want to deploy our Web Gallery using HTTP on the Digital Ocean VM that is associated with your Github repository. The goal is to make your application accessible any browser with the following url (replace `repository_name` with your repository name): 

```
http://repository_name.amazingcloud.space
```

To deploy your application:

1. Copy your code into the VM `rsync -avz --delete -e ssh . root@repository_name.amazingcloud.space:web-gallery` (replace `repository_name` with your repository name).

2. SSH to the VM `ssh root@repository_name.amazingcloud.space` and `cd web-gallery`

3. Build the backend docker image (should be done the first time and every time the backend code has changed):

  ```
  docker build -t web-gallery:latest .
  ```

4. Run the Docker container:

  ```
  docker run  --rm -d --name web-gallery -p 80:3000 web-gallery:latest 
  ```

  This will map the port 80 of the VM to the port 3000 of the docker container. 

5. Check the logs:

  ```
  docker logs web-gallery
  ```

6. Access your app on the browser `http://repository_name.amazingcloud.space`. You should see the message `Welcome to HW2!`

7. To stop the container

  ```
  docker stop web-gallery
  ```

## Code quality and organization

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB (`@seald-io/nedb`) to build your back-end. You should not need more than the packages that were introduced in the labs. Make sure that all of these required packages are recorded in the `package.json` file.

**Important:** You are asked to deploy your code in production on a Virtual Machine (VM) that we provide. The TA will directly test your app in production. Make sure that your code works and that your application does not crash. **Deploying is hard, therefore, it is recommended to deploy early and often while your are building your application.**

All of your work should be well organized. This directory should be organized as follows:

- `src/app.mjs`: the main file
- `src/package.json` and `package-lock.json`: the Node.js package file
- `src/static/`: your frontend developed for assignment 1 (HTML, CSS, Javascript and UI media files)
- `src/db/`: the NeDB database files
- `src/uploads/`: the uploaded files
- `src/test/`: the unit test files
- `.gitignore`: list of files that should not be committed to GitHub

Your code must be of good quality and follow all guidelines given during lectures and labs. Remember, any code found online and improperly credited can constitute an academic violation.

## Implementing and testing the Web API

In this part, you are going to implement a Web API for your gallery and the corresponding unit tests. This api should follow the REST design principles
seen in class. This means that the api should define CRUD operations (Create, Read, Update, Delete) on collections and
elements. For your application, users should be able to:

- add a new image to the gallery by uploading a file
- retrieve and delete a given image
- add a comment to a given image
- retrieve comments for a given image (a subset of comment at a time but not all comments at once)
- delete a given comment

As the previous assignment, we provide a starter file called `api.mjs` for the **the Frontend API**. This api must be re-implemented. Instead of storing data locally, the *the Frontend API** should call the Web API using `fetch`.

Make sure that your unit tests are exhaustive. They should properly test your API.

## Integrating the frontend

This part of the assignment is worth 10% only and builds on top of what you have already built for assignment 1.

In this part, you are going to update your frontend to work with the Web API. As done in assignment 1, this frontend
must be a [Single-Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) that loads a single
HTML webpage. This webpage is updated dynamically as the user interacts with it. The page does not reload nor transfer
control to another page (except for the credits page that you keep separated). All features written for assignment 1
should be updated or completed to push and pull data from the API.

## Submission and Grading

Deploy your app on the VM and make sure that everything works. You work should be accessible through the following URL (replace `repository_name` with your repository name):

```
http://repository_name.amazingcloud.space
```

To submit your work, push your final version of your code to the `main` branch of your hw2 Github repository created through Github classroom. The timestamp of that latest commit will be used to calculate the number of late days used.

When comes the time for the course staff to grade your work, keep in mind the following:

- The course staff will not execute your source code but it will directly test your app using the deployed URL. If your application does not work from this URL, your work will get a 0. 
- The course staff will checkout your code at the latest commit on the main branch of your official course repo for that work (created through Github classroom). Code pushed to different commit or different branch will be ignored.
- The code deployed on the VM should be exactly the same as the source code on Github. If we notice any difference (even the smallest one) between the source code the deployed version and the source code on Github, your work will get a 0.
