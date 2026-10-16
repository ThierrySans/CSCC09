---
layout: default
permalink: /work/lab7/
---

# Lab 7 - Introduction to React

In this lab, you will be using React to build the Frontend. 

### Grading

**Important:** This homework has some starter code that is available on Classroom 50. If you do not have access to Classroom 50, please send a private message to the instructor on Piazza. 

You must show your work in-person to the TA during your assigned practical time or during the TA office hour.

## Learning React with the ToDo App

There is nothing to do in this part. However, it is important for you must first gain a basic understanding of how to
use React. First read through the todo-app React sample project on the course Github. The README provides a basic
introduction to React while describing the migration process of the original todo app to React.

<https://github.com/UTSCC09/Todo-React>

Additionally, the official [React](https://reactjs.org/) website has a bunch of good documentation. However, a lot of the React documentation found online uses the old class based components, which has become more legacy in the recent
years. As such, we ask that you complete this lab using functional components
and hooks. For this lab, you will most likely use the `useState`, `useEffect` and the `useRef` hooks.
However, it is also worth understanding what the other hooks do.

When debugging React applications, it is not as easy as writing Javascript in the
Javascript Console. Instead, you would use [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

## Refactoring the Microblog App

In the `backend` folder, there is minimal implementation of the ToDo app (similar to lab 4, so without users). After installing the NPM packages, you can see that this app is fully working and runs on the port 4000.

In the `frontend` folder, we have initialized a React frontend using the [React framework Next.js](https://nextjs.org/). After installing the NPM packages, you can see that this app is working and runs on the port 3000. This frontend is nothing less than the default Next.js app  and it is indeed not connect to our todo backend. 

The goal of this lab is to create a new frontend written in React and connect it to the backend. In the end, the goal is to remove the entire `static` folder from the backend and remove the line that serves static files in your express backend. 

```
app.use(express.static(path.resolve("static")));
```

As a result, we will have two servers: one for the frontend and one from the backend. This means two things:

1. Our frontend will now make cross-domain requests to the backend and you will have to modify the frontend api code `api.mjs`
2. Our backend should enable cross-domain request resource sharing (CORS) to relax the same origin policy and prevents those cross-domain request to be blocked.

You can look at the ToDo app to see how to do those things. 