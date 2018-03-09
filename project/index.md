---
layout: default
permalink: /project/
---

# Project

In this project, you can build whatever you want and you can use any library, framework, tool and programming language of your choice. However, your project must contain two distinct pieces: 

- a frontend UI that works relatively well on the commonly used web browsers
- a web API that follows the REST design principles and that is completely independent from the frontend 

By the end of the semester, your app must be online and usable by the course staff. 

## Academic Integrity

The course policy on academic integrity applies to this project. This means that all code developed for this project must be written exclusively by the team members. Any use of UI elements and snippets of code found on the web must be clearly cited in the credit page of the application. 

The team members have the freedom to build whatever they want as a project, however the following restrictions strictly apply: 

1. the deliverable cannot contain any piece of work that was developed outside of the scope of this course
1. the deliverable cannot contain any piece of work that will also be used for another paid work
1. the deliverable cannot contain any piece of work that will also be used for another course deliverable

All team members will be held accountable in case of violation of the policy stated here. 

## Marking 

The grading rubric is decomposed as follows: 

- **Team registration and project proposal:** 10%
- **Beta version:** 10%
- **Final version:** 70%
- **Documentation and presentation:** 10%

Your final version will be evaluated as follows (out of 70%):

- does it work well? 15% 
- does it follow the best practices and design principles? 15%
- is it secured? 15%
- is it well implemented? 15%
- how is the quality of the UI/UX? 10%

Indeed, we acknowledge that it is harder to deliver higher quality when the project idea is challenging. Yet, we want to encourage you to explore complex web interactions for your project. Therefore your project will receive an *challenge factor* that ranges between 0.5 and 1.5 that we will use to adjust your project final mark. For instance, a challenging project with a *challenge factor* of 1.2 and a score of 78/100 will receive a final mark of 93/100.

## Project Challenge

While grading your project, the course staff will not judge the idea itself. Instead, they will evaluate the quality of the application and assess whether the application is substantial and challenging. In the end, the course staff will evaluate the overall effort that was put in the project. 

Based on previous experiences, things that could be quite challenging: 

- integrating several APIs
- new development framework
- mobile app, desktop app, browser app
- real time synchronization (webRTC, webSockets) beyond the simple chat messenger
- 2D, 3D
- when the backend interacts with the OS shell commands, VMs and so on that poses security issues

Contrary to things that are usually not challenging:

- make it look good (it is a requirement)
- geolocation
- building a chat app (tons of examples on the web) 
- speech recognition (covered in class) unless done in context (AI)
- facebook authentication (or any other third-party authentication) (covered in class)
- security (it is a requirement) unless you app works with the OS extensively
- building a complex AI (this course is not an AI course). Instead find an API/library that does it for you
- Complex speech processing (this course is not about NLP), instead find an API/library that does it for you
- Complex gameplay (this course is not about gaming), instead make the game simple and focus on web interactions 

Here are few examples of applications from previous years:

- a massive multiplayer game that uses webRTC for P2P communications between browsers
- a browser extension that adds several project management functionalities to Github
- a collaborative application to plan travels interactively
- a GitHub-like to share and showcase private projects to future employers
- a latex editor a la google docs with realtime visualization of pdfs and multi user editing support
- an image editing application
- a web application for remote desktop or server admin
- a jQuery-like library
- a museum application where user can browse a historical map with a timeline, photos and videos of that time
- a Mario like game with the possibility for users of creating news maps 
- an app that automatically queries open data api for a given city and shows various statistics and graphs
- an app to create new audio tracks to add to youtube and share with other + a browser api to get these additional tracks in youtube
- an app for advising students on the best academic path to graduate
- an app that performs fine-grained twitter sentiment analysis with a neat animated 2D visualizations
- a kinect-like app to interact with computer with the camera, draw something on the screen and interact with other users

## Deliverables

### Team registration and project proposal

After registration, each team will be assigned a new private Github repository for the project. By the project proposal deadline, the team should have pushed the proposal to their project repository. The proposal will take the form of a `README.md` file at the root of your project repository on Github. This file should be properly formatted in [markdown](https://guides.github.com/features/mastering-markdown/). 

To receive full credits, the proposal should contains the following information: 

- project Title
- team Members
- a description of the web application
- a description of the key features that will be completed by the Beta version
- a description of additional features that will be complete by the Final version
- a description of the technology that you will use
- a description of the top 5 technical challenges

### Beta Version

By the beta version deadline, your team should have:

1. pushed the beta version to the project repository on Github
2. scheduled a 20min meeting to demo and discuss the beta version. 

The meeting with the TA must be scheduled before the deadline but it can take place after the deadline. To receive full credits, your team should demonstrate that the key features of your application work. 

### Final Version

By the final version deadline, your team should have: 

1. pushed the final version to the project repository on Github
3. deployed the application and provide its public URL in the `README.md` file

Since every project is unique, grading is subjective. While evaluating the application, the course staff will take into considerations:

- is the idea challenging and substantial?
- is the user interface intuitive and appealing?
- is the application working well?
- is the application secured? 
- is it well implemented? does it covers the concepts seen in class correctly?
- is the source code clean and well organized?

### Documentation and Presentation

Before your final presentation, your team should have updated the application with its documentation. For each API method, the documentation should detail:
  
1. Description: a description of the method
1. Request: HTTP method (either POST, PUT, GET, PATCH or DELETE) and URL   
    - content-type: [optional] the [type of](http://www.iana.org/assignments/media-types/media-types.xhtml) the request body (by default it is raw text)
    - body: [optional] a precise description of the body
1. Response(s): the [HTTP status code](http://www.restapitutorial.com/httpstatuscodes.html)
    - content-type: [optional] the [type of](http://www.iana.org/assignments/media-types/media-types.xhtml) the response body (by default it is raw text)
    - body: [optional] a precise description of the body
1. Example: aan example of such an API query using `curl`

Given that we have about 40 projects in total. It is not possible to ask all of you to give a presentation in class. Instead, you are going to take a video demoing your app. This video must 3 min long (+-20 seconds). It should show your web app (no slide, no code) and the soundtrack should be you explaining what you are doing on screen. 

To make sure that this video is of good quality, here is a good way to proceed: 

1. take a video of you demoing your app. Do not film your physical screen with your phone. Instead, make a video by capturing your screen and your microphone directly on your computer. You can easily do that using VLC: open "File" > "open capture device", select "screen" and check "use mic"
2. Check the video quality, edit the video if necessary. Again VLC can do this with VLC. 
3. Upload this video on Youtube (either as a private or public video) and share the video URL on your Github README file.
