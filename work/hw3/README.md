---
layout: default
permalink: /work/hw3/
---

# Hw 3 - Managing Users in the Web Gallery

The objective of these assignments is to build an application called _The Web Gallery_ where users can share pictures and comments. This application is similar to existing web applications such as Facebook, Instagram or Google Photos.

In this last assignment, you will concentrate on 

- adding new features  such as user authentication, authorization, and security.
- deploying your application on HTTPs using a reverse proxy a multi-containerized setup

##  Deployment

For this homework, we want to deploy our Web Gallery using HTTPS on the Digital Ocean VM that is associated with your Github repository. The goal is to make your application accessible any browser with the following url (replace `repository_name` with your repository name): 

```
https://repository_name.amazingcloud.space
```

### Deploying your Application

1. If not done already, edit the `docker-compose.yml` file to set your domain. In this file, replace the occurrences of the string `${DOMAIN}` with `repository_name.amazingcloud.space` (replace `repository_name` with your repository name).

2. Copy your code into the VM `rsync -avz --delete -e ssh . root@repository_name.amazingcloud.space:web-gallery`

3. SSH to the VM `ssh root@repository_name.amazingcloud.space` and `cd web-gallery`

4. Build the backend docker image (should be done the first time and every time the backend code has changed):

  ```
  docker compose build
  ```

5. Run the Docker containers:

  ```
  docker compose up -d
  ```

6. Check the logs:

  ```
  docker compose logs -f
  ```

  FYI, the first time you run this setup, the `acme-companion` container will create a certificate for your domain `repository_name.amazingcloud.space` and ask *Let's Encrypt* to sign it. This process takes couple of minutes. 

6. Access your app on the browser `https://repository_name.amazingcloud.space`. You should see the message `Welcome to HW3!`

7. To stop all containers 

  ```
  docker compose down
  ```

### Understanding the Deployment Setup

There are 4 containers orchestrated by the `docker-compose.yml` file:

- `nginx-proxy` is a reverse proxy container routing HTTP/HTTPS requests to the corresponding container based on the domain requested. It is the only container connected to the ports 80 and 443 of your VM.
- `acme-companion` creates and renew TLS certificates automatically for all HTTPS domains 
- `frontend` is the Web Gallery Frontend using a dockerized NGINX server to serve static files (HTML, CSS, frontend JS and other media files)  
- `backend` is the Web Gallery Backend using dockerized Ubuntu running your Express server (see `backend/Dockerfile` docker config file)

For this homework, we only have one domain `repository_name.amazingcloud.space` that we want to deploy in HTTPS. We want the reverse proxy to route all HTTPS requests to the frontend at first. If the request is for one of our static files, the frontend container returns that file. However, if the HTTP starts with `/api/`, the frontend reroute this request to the backend container (see the `frontend/nginx.conf` NGINX config file)

This deployment has several advantages:

1. the same VM can host multiple applications running for multiple domains
2. the frontend and the backend are on the same domain, meaning it does not require any cors setup

## Working with the Code

Let's look at the backend code in `backend/src`. 

### Starting the Development server

The file `package.json` contains two scripts: `npm run dev` to start the server in *development* mode and `npm run prod` to run the server in *production* mode. Depending on which mode is running, the environment variable `NODE_ENV` is either set to `dev` or `prod` respectively. 

The file `backend/src/app.mjs` contains a minimal Express backend server. Open this file and review the code to see how the environment variable `NODE_ENV` is used:

1. the `secure` flag on the session cookie is set to `false` in development mode but to `true` in production when the application is actually deployed in HTTPS
2. The static files are served by the Express framework in development mode but not in production mode since they will be served more efficiently by our separate dockerized NGINX frontend server

### Understanding the .env file

While inspecting the code, you have most likely noticed that there is another environment variable called `SESSION_SECRET` used for setting the session `secret` value. This environment variable is defined in the `backend/src/.env` file provided with the starter code . This file is supposed to store all kind of secrets such as session secrets, database login and passwords, API tokens to avoid having those sensitive data in the source code directly and being pushed to Github. 

Indeed the `.env` file should not be pushed to Github but it was pushed there at first for convenience. Ideally, this file should be removed from Github and added to the `gitignore` file before changing all secret values. Indeed, you will need to recreate this file on the deployment VM before building the backend docker image.

## Building the Features

For this assignment, you should use Node.js, the Express web framework and the embedded NoSQL database NeDB (`@seald-io/nedb`) to build your application. You should not need more than the packages that were introduced in the labs. Make sure that all of these required packages are recorded in the `package.json` file.

**Important:** It is recommended to push, deploy and test your application in production as you build new features. Deploying is hard and often requires some complex debugging. So do not wait for the last minute to deploy your code. 

###  Authenticated Users and Multiple Galleries

In this part, you are going to extend your API to support authenticated users and multiple galleries. Each user will now have their own gallery. Users will be authenticated through the API (local authentication based on sessions). In addition, access to the API is ruled by the following authorization policy:

- Unauthenticated users cannot read any picture nor comment
- Authenticated users can sign-out of the application
- Authenticated users can browse any gallery
- Gallery owners can upload and delete pictures to their own gallery only
- Authenticated users can post comments on any picture of any gallery
- Authenticated users can delete any one of their own comments but not others
- Gallery owners can delete any comment on any picture from their own gallery

While refactoring your application, you might want to redesign your REST API to reflect the fact that image galleries are owned by users.

### Integrating the Frontend

Update your current frontend to reflect all changes made above. The homepage should now be a paginated list of all galleries that can be browsed. Users should be able to sign-up, sign-in and sign-out into the application and do no longer need to enter their username when adding images and comments.

## Submission and Grading

Deploy your app on the VM and make sure that everything works. You work should be accessible through the following URL (replace `repository_name` with your repository name):

```
https://repository_name.amazingcloud.space
```

To submit your work, push your final version of your code to the `main` branch of your hw3 Github repository created through Github classroom. The timestamp of that latest commit will be used to calculate the number of late days used.

When comes the time for the course staff to grade your work, keep in mind the following:

- The course staff will not execute your source code but it will directly test your app using the deployed URL. If your application does not work from this URL, your work will get a 0. 
- The course staff will checkout your code at the latest commit on the main branch of your official course repo for that work (created through Github classroom). Code pushed to different commit or different branch will be ignored.
- The code deployed on the VM should be exactly the same as the source code on Github. If we notice any difference (even the smallest one) between the source code the deployed version and the source code on Github, your work will get a 0.