---
layout: default
permalink: /work/hw2/
---

# Hw 2 - Building the Web Gallery Backend

The objective of these assignments is to build an application called _The Web Gallery_ where users can share pictures and comments. 

In this second assignment, we are going to build the backend and deploy it on a cloud Virtual Machine (VM). More specifically, we are going to build a Web API following the REST design principles.

## Submission and Grading

**Important:** This homework has some starter code that is available on Classroom 50. If you do not have access to Classroom 50, please send a private message to the instructor on Piazza. 

There are two things to do when submitting your work: 

1. Push your final version of your code to the `main` branch of your hw2 Github repository created through Classroom 50. The timestamp of that latest commit will be used to calculate the number of late days used.

2. Deploy your application on the provided VM and make sure that everything works. You work should be accessible through the following URL (replace `repository_name` with your Github repository):

```
http://repository_name.amazingcloud.space
```

When comes the time for the course staff to grade your work, keep in mind the following:

- The course staff will not execute your source code but it will directly test your app using the deployed URL. If your application does not work from this URL, your work will get a 0. 
- The course staff will checkout your code at the latest commit on the main branch of your official course repo for that work (created through Classroom 50). Code pushed to different commit or different branch will be ignored.
- The code deployed should be exactly the same as the source code on Github. If we notice any difference (even the smallest one) between the source code the deployed version and the source code on Github, your work will get a 0.

##  Deployment

The starter code that is working and deployable. We recommend to deploy the starter code first to get familiar with the deployment process using the instructions below.

Once you have deployed the starter code, you should access your app on the browser `http://repository_name.amazingcloud.space` (replace `repository_name` with your repository). You should see the message `Welcome to HW2!`

Then, as you build your web application, we recommend to deploy your application on the VM as often as possible. 

### Accessing and configuring the VM

1. Setup the SSH key following these instructions [here](https://thierrysans.me/CSCC09/doc/vm/)
2. SSH into the VM: 

  ```
 ssh root@repository_name.amazingcloud.space
  ```

3. Install Docker **on your VM** following these instructions [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04). 

4. Make sure that docker is working:

  ```
  docker run --rm hello-world
  ```
  
5. You can learn more about how to use Docker [here](https://thierrysans.me/CSCD27/doc/docker/)

### Deploying the application

To deploy your application:

1. From your computer first, copy your code into the VM `rsync -avz --delete -e ssh . root@repository_name.amazingcloud.space:web-gallery` (replace `repository_name` with your repository name).

2. SSH to the VM `ssh root@repository_name.amazingcloud.space` and `cd web-gallery`

3. Build the backend docker image (should be done the first time and every time the backend code has changed):

  ```
  docker build -t web-gallery:latest .
  ```

4. Run the Docker container:

  ```
  docker run  --rm -d --name web-gallery -p 80:3000 -v $(pwd)/data:/home/app/data web-gallery:latest 
  ```

  This will map the port 80 of the VM to the port 3000 of the docker container. 

5. Check the logs:

  ```
  docker logs web-gallery
  ```

6. Access your app on the browser `http://repository_name.amazingcloud.space`.

7. To stop the container

  ```
  docker stop web-gallery
  ```

## Code quality and organization

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB (`@seald-io/nedb`) to build your back-end. You should not need more than the packages that were introduced in the labs. Make sure that all of these required packages are recorded in the `package.json` file.

**Important:** You are asked to deploy your code in production on a Virtual Machine (VM) that we provide. The TA will directly test your app in production. Make sure that your code works and that your application does not crash. **Deploying is hard, therefore, it is recommended to deploy early and often while your are building your application.**

All of your work should be well organized. This directory should be organized as follows:

- `.gitignore`: list of files that should not be committed to GitHub
- `data/db/`: the NeDB database files
- `data/uploads/`: the uploaded files
- `src/app.mjs`: the main file
- `src/package.json` and `package-lock.json`: the Node.js package file
- `src/static/`: your frontend developed for assignment 1 (HTML, CSS, Javascript and UI media files)
- `src/test/`: the unit test files

Your code must be of good quality and follow all guidelines given during lectures and labs. Remember, any code found online and improperly credited can constitute an academic violation.

## Implementing and testing the Web API

In this part, you are going to implement a Web API for your gallery and the corresponding unit tests. This api should follow the REST design principles seen in class. This means that the api should define CRUD operations (Create, Read, Update, Delete) on collections and elements. For your application, users should be able to:

- add a new image to the gallery by uploading a file
- retrieve and delete a given image
- add a comment to a given image
- retrieve comments for a given image (a subset of comment at a time but not all comments at once)
- delete a given comment

As the previous assignment, we provide a starter file called `api.mjs` for the **the Frontend API**. This api must be re-implemented. Instead of storing data locally, the *the Frontend API** should call the Web API using `fetch`.

Make sure that your unit tests are exhaustive. They should properly test your API.

## Integrating the frontend

This part builds on top of what you have already built for assignment 1.y ou are going to update your frontend to work with the Web API. 

As done in assignment 1, this frontend must be a [Single-Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) that loads a single HTML webpage. This webpage is updated dynamically as the user interacts with it. The page does not reload nor transfer control to another page (except for the credits page that you keep separated). 

All features written for assignment 1 should be updated or completed to push and pull data from the API.