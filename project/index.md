---
layout: default
permalink: /project/
---

# Project

As a team (2-3 people), you can build whatever you want for your project. By the end of the semester, your app must be deployed and fully functioning. The course staff will evaluate the application online directly. 

Your project will be evaluated based on the richness of the web interactions. However, here are things that will **not** be taken into account:

- wether the application is useful or not
- all things unrelated to web development (game play, machine learning model, 3D models and so on)

## Constraints

1. Your frontend must be a Single Page Application (SPA) built with either:
        - A production-grade React either [Next.js ](https://nextjs.org/), [Remix](https://remix.run/) or [Gatsby](https://www.gatsbyjs.com/) (but you  CANNOT use **create-react-app** or **Expo**)
        - [Angular](https://angular.io/) 
        -  [View](https://vuejs.org/)
        - or [Vite](https://github.com/vitejs/vite)

    Indeed, you can combine that framework with other UI frameworks such as Material UI, Bootstrap, Tailwind CSS and so on. If you believe that nonce of these frameworks are appropriate for your project, let's discuss it. We can make exceptions on a case by case basis if it is justified. 

2. On the backend you can use whatever language and framework you want. Note that some of the React frameworks are full-stack (meaning they can be used in the backend as well). 

3. The Web API should be either:
        - RESTful
        - GraphQL
        - or JSON-RPC 

4. The application must be entirely deployed on the provided Virtual Machine. The application must be publicly accessible via the VM URL and you are also allowed to have your own custom domain. 

5. The application must have both local authentication and third-party authentication (OAuth). Optionally, you can also add Multi-Factor Authentication with email verification or a TOTP code. 
 
## Marking 

The grading rubric is decomposed as follows: 

- **Team registration and project proposal:** 5%
- **Beta version:** 10%
- **Presentation:** 10%
- **Final version:** 75%

Your final version will be evaluated as follows (out of 75%):

- does it work well? 15% 
- does it follow the best practices and design principles? 15%
- is it secured? 15%
- is it well implemented? 15%
- how is the quality of the UI/UX? 15%

There are two important things to consider:

- We will only test and grade your application based on the deploy link. We will not execute your source code. If your application does not work from this link, your project will likely received a low score. 
- The deployed code should be exactly the same as the submitted source code on Github. If we notice any difference between (even a smallest one) the deployed version and the submitted code, your work will get a 0

All team members must put their best effort to contribute to the project. The instructor reserves the right to assign different grades to each of the team members based on their individual contributions on Github.

## Academic Integrity

The course policy on academic integrity applies to this project. This means that all code developed for this project must be written exclusively by the members of the team. Any use of UI elements and snippets of code found on the web must be clearly cited in the credit page of the application. 

You have the freedom to build whatever they want as a project, however the following restrictions strictly apply: 

1. the deliverable cannot contain any piece of work that was developed outside of the scope of this course
1. the deliverable cannot contain any piece of work that will also be used for another paid work
1. the deliverable cannot contain any piece of work that will also be used for another course deliverable

Each team member is responsible and will be held accountable for the work he or she submits to the Github repository. 

## On the use of AI

You are permitted to use AI tools to assist in writing your code. However, you must clearly identify all AI-generated portions by providing a link to the AI prompt and its corresponding response. That said, you remain fully responsible for all code submitted under your name and must be able to explain every part of it in detail.

From past experience, AI-generated code is not always of high quality as it can be unnecessarily verbose, poorly designed, and may fail to follow best practices. Projects that relied too heavily on AI have generally received lower grades as a result. 

My recommendation is to use AI critically and thoughtfully. Always question what the generated code does, verify its correctness, and ensure it truly and precisely solves the problem at hand.

## Project Requirements and Challenge Factor

In the end, the course staff will not judge the idea itself but the overall effort that was put in the project. Instead, we will evaluate the quality of the application and assess whether the application is substantial and challenging. 

Indeed, we acknowledge that it is harder to deliver higher quality when the project idea is challenging. Yet, we want to encourage you to explore complex web interactions for your project. 

Therefore your project will receive an *challenge factor* that ranges between 0.5 and 1.5 that we will use to adjust your project final mark. For instance, a challenging project with a *challenge factor* of 1.2 and a score of 78/100 will receive a final mark of 93/100.

## Deliverables

### Team Registration

One team member should create the team repo through [Github classroom](https://classroom.github.com/a/XmOgUbBd)

Then, all the other team members should **join the project repo through Github Classroom**.

### Project Proposal

As a team, you will submit your proposal on Github. Your proposal should be in the `README.md` file at the root of your Github repository. Make sure that your proposal is [properly formatted in Markdown format](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). 

To receive full credits, the proposal should contains the following information: 

- project Title
- a description of the web application
- a description of the key features that will be completed by the Beta version
- a description of the additional features that will be complete by the Final version
- a description of the technology stack that you will use to build and deploy it
- a description of the top 5 technical challenges. Understand that a challenge is something new that you have to learn or figure out. Anything we have already covered in class cannot be considered as a challenge. Making the application work and deploying it is not a challenge but a project requirement. 

### Beta Version

By the beta version deadline, your team should have:

1. pushed the beta version to the project repository on Github
2. deployed the application and provide its public URL in the `README.md` file
3. scheduled a 20min meeting to demo and discuss the beta version. 

The meeting with the TA must be scheduled before the deadline but it can take place after the deadline. To receive full credits, your team should demonstrate that the key features of your application work on the deployed application. 

### Final Version

By the final version deadline, your team should have: 

1. pushed the final version to the project repository on Github
2. deployed the application and provide its public URL in the `README.md` file
3. filled the design document template (coming soon)

Since every project is unique, grading is subjective. While evaluating the application, the course staff will take into considerations:

- is the idea challenging and substantial?
- it it complex to build? Is it complex to deploy?
- is the user interface intuitive and appealing?
- is the application working well?
- is the application secured? 
- is it well implemented? does it covers the concepts seen in class correctly?
- is the source code clean and well organized?

### Presentation

Given that we'll have about 50 projects. It is not possible to ask all of you to give a presentation in class. Instead, you are going to take a video demoing your app. This video must 3 min long (+-20 seconds). It should show your web app (no slide, no code) and the soundtrack should be you explaining what you are doing on screen. To make this video, you can either use Zoom or VLC.

## Recommendations

Here are some key recommendations to consider: 

- Work on the most challenging parts first. Have them ready by the beta version. 
- Deploy early, deploy often. Deploying is harder than you think and it requires major changes in the code most likely. 
- Be careful with third-party API. Be aware of their limitations and restrictions.
