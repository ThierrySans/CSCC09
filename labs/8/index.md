---
layout: default
permalink: /labs/8/
---

# Lab 8: Deploying

As part of your project, you are asked to deploy your web application. As discuss in class, there are plenty of options to deploy your application and you are free to chose the most adequate for you. 

One option is to host your application on our C09 server called `cms-weblab.utsc.utoronto.ca`. This server will run your application in a dedicated *Docker* container. Docker is a virtualization tool that offer a flexible way to create and manage self-contained execution environments. 

In this lab, you will first get familiar with Docker and learn how to run docker containers locally on your machine. Thus, you will learn how to configure a docker container to embed all framework, libraries and software that your need to run your application. For now, you are not going to deploy your application on the courser server. However, you will be able to do so for your project.

###  Recommended work setup

This lab has a starter code that can be found on the course Github repository `/labs/8/app`. Docker is already installed on the lab machines, however, you can also [install docker on your laptop](https://docs.docker.com/engine/installation/) if you want.

### Submission

You should push your work to Github at the end of your practical session. 

# Deploying your application using Docker

In this part, we are going to get familiar with Docker. First, we are going to execute a docker container that runs our microblog application on port 443. Thus, we will write a docker configuration file (called a `Dokerfile`) to customize our container and automate the deployment. 

## Docker hello-world

A docker container is a self-contained execution environment. As a user perspective, a docker container is similar to  a virtual machine that runs separately from the operating system running on your host (the one running on your lab machine or your own laptop). A Docker container is created from a Docker image that defines the operating system and the list of programs that will run in the containers. 

Let us run the `hello-world` example for Docker. We are going to create a container called `my_container` based on the [hello-world](https://hub.docker.com/_/hello-world/) Docker image, one of the many Docker images available from the [Docker hub](https://hub.docker.com/). When it starts, this container executes the `hello` program and then terminates. 
 
```
docker run --name my_container hello-world
```

As soon as the program terminates, the container shuts down but the container still exists on your machine: 

```
docker ps -a
```

Terminated Docker containers are no longer useful. You should remove this container from your system. Otherwise, you will not be able to run any new container with the same name (but you can others). 

```
docker rm my_container
```

## Running your Nodejs app with Docker

To run your application, we are going to use the official Node.js Docker image called [node](https://hub.docker.com/_/node/). This image is based on Linux (Debian) and Node.js is already installed in it. To run our application in this container, we are going to execute this container with the following options:

- `-p 443:4000` maps the port 443 of our host to the port 3000 of the container
- `-v $(pwd)/app:/home/nodejs/app` mount the host current path to another one in the container
- `bash` start an interactive shell

The following command starts the container and gives us a shell into it: 
```
cd labs/8/
$ docker run -p 443:3000 -v $(pwd)/app:/home/nodejs/app -it --name my_container node bash
```

Now, we can install all required npm modules and start our application: 

```
cd /home/nodejs/app
npm install
node app.js
```

Our application is now available on the regular HTTPS port (443 by default): [https://localhost/](https://localhost/). 

As in the first exercise, as soon as we exit the container (CTRL-D), the shell terminates and the container shuts down. Thus, we can now remove it from the system. 

```
docker rm my_container
```

## Writing a Dockerfile

In this exercise, rather that building our docker container manually, we are going to automate the built using a `Dockerfile` with the following content: 

    ```
    # base image
    FROM node

    # create the application directory
    RUN mkdir -p /home/nodejs/app
    # copy the application
    COPY ./app /home/nodejs/app
    # move to working directory
    WORKDIR /home/nodejs/app
    # install all npm modules
    RUN npm install --production
    # run the nodejs application
    CMD node app.js
    ```

Using this `Dockerfile`, we can create a new image called `my_image` that embeds our web application and runs it automatically when the container starts. 

```
docker build -t my_image .
```

This image is stored along with all other images downloaded or built on our machine: 

```
docker images
```

Using this new base image, we can now run a container with our app:

```
docker run -p 443:3000 --name my_container -d my_image
```

This time, the `run` command terminates but the container is still running in a detached mode (`-d` option). 

```
docker ps -a
```

The container will keep on running indefinitely assuming that our application does not have any bug that would terminate the nodejs program. The nodejs program running in the container generates some outputs on `stdout`, but these outputs do not appear in our console since it is occurring inside the container. To show these outputs, we need to show the logs generated by the container: 

```
docker logs my_container
```

We cannot remove a running docker container. We need to stop it before removing it: 

```
docker stop my_container
docker rm my_container
```

For deploying your project on the course server, you will need to have such a `Dockerfile` at the root of your Github project repository. The server will automatically run the corresponding Docker container on every `push` event occurring to the repository. 

# Dynamic caching with Memcached

In this part, we are going to modify our application to use Memcached and avoid redundant database requests. 


## Modifying our app

In this first exercise, we are going to assume that there are more viewers than posters using our microblog application. This means that, we have a significantly higher number of requests to retrieve the latest messages compared to the number of requests to post new ones. Therefore, we are going to use Memcached to dynamically cache message requests. 

Since, we need to work on developing our app with are not going use Docker to run it. We will simply use nodejs locally in the same way we have been using so far for developing our app. However, since Memcached is not installed on the machine we are going to use the [Memcached](https://hub.docker.com/_/memcached/) Docker image to setup a Memcached server rather than installing it locally. Thanks to this container, Memcached will run locally on its default port 11211. 

```
docker run -p 11211:11211 --name my_memcached -d memcached
```

Thus, we need to install the [nodejs Memcached library](https://www.npmjs.com/package/memcached) and configure our app to use it:

```
var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');
```

Now, we can modify your application to either `set` or `get` cache values when retrieving and posting messages. For more details, you can check the nodejs Memcached [documentation](https://www.npmjs.com/package/memcached) or take a look at the example shown in class. 

Once your application is working correctly with Memcached, you can stop the Memcached Docker container. 

## Deploying our new app with Docker

We are now ready to re-deploy our application. However, our application is now using Memcached but the original Docker image `node` does not have Memcached installed in it. We are going to modify our `Dockerfile` to:

1. install Memcached into our image
    `RUN apt-get update && apt-get install -y memcached`
2. run Memcached before executing our app when the container starts
    `CMD service memcached start && node app.js`

The `Dockerfile` should now be:

```
FROM node

RUN apt-get update && apt-get install -y memcached

RUN mkdir -p /home/nodejs/app
COPY ./app /home/nodejs/app
WORKDIR /home/nodejs/app
RUN npm install --production

CMD service memcached start && node app.js
```

Finally, we can rebuild the image and start a new container to test this new image. 

```
docker build -t my_image .
docker run -p 443:3000 --name my_container -d my_image
```

Push your work (including the `Dockerfile`) to Github. 
