---
layout: default
permalink: /work/hw1/
---

# Hw 1 - Building the Web Gallery Frontend

The objective of these assignments is to build an application called _The Web Gallery_ where users can share pictures and comments with others.

In this first assignment, we are going to build the frontend and deploy it on Github page. 

## Submission and Grading

**Important:** This homework has some starter code that is available on Classroom 50. If you do not have access to Classroom 50, please send a private message to the instructor on Piazza. 

There are two things to do when submitting your work: 

1. Push your final version of your code to the `main` branch of your hw1 Github repository created through Classroom 50. The timestamp of that latest commit will be used to calculate the number of late days used.

2. Deploy your application on Github Page and make sure that everything works. You work should be accessible through the following URL (replace `repository_name` with your Github repository):

```
https://UTSCC09.github.io/<repository_name>/
```

When comes the time for the course staff to grade your work, keep in mind the following:

- The course staff will not execute your source code but it will directly test your app using the deployed URL. If your application does not work from this URL, your work will get a 0. 
- The course staff will checkout your code at the latest commit on the main branch of your official course repo for that work (created through Classroom 50). Code pushed to different commit or different branch will be ignored.
- The code deployed should be exactly the same as the source code on Github. If we notice any difference (even the smallest one) between the source code the deployed version and the source code on Github, your work will get a 0.

## Deploying your web application on Github Pages

The starter code that is working and deployable. We recommend to deploy the starter code first to get familiar with the deployment process. Then, as you build your web application, we recommend to push changes to Github and deploy your application as often as possible.

To deploy your application, follow the instructions here https://docs.github.com/en/pages/quickstart.

**Important:** There is no need to create another Github repository as the tutorial suggest in the first steps. Instead, you should use the Github repository created through Classroom 50 exclusively. Therefore, you can start the tutorial at step 6 directly.

On Github Page is setup on the repository, you can access your app on the browser `https://UTSCC09.github.io/<repository_name>/` (replace `repository_name` with your repository). You should see the message `Welcome to HW1!`

## Building the frontend

In this first assignment, we will concentrate on the front-end only. Users will be able to add images to the gallery. Our app will have two URLs:

- `/` or `/index.html` is the main page where users can browse through images, add new images and comment.

- `/credits.html` is the credits page that should contains the references of the images, buttons and snippets of code that you have used used for this assignment.

For this assignment, you must:

- implement all HTML and CSS from scratch
- write Vanilla Javascript only
- implement the web app as a Single Page Application (SPA) - the page should not reload by itself

For this assignment, you are **not** allowed to:

- use any CSS template
- use any javascript library or framework
- use or develop any server-side feature
- use any AI assistant to generate code

## Code quality and organization

You code repository must be organized as follows:

- `/index.html`
- `/credits.html`
- `/js`: all javascript files
- `/style`: all css files
- `/media`: all media files related to the UI (images, icons and so on)

Your code must be of good quality and follow all recommendations given throughout the course. In this assignment, it means (non necessarily exhaustive):

- no use of deprecated HTML tags
- proper use of id and class attributes
- the page does not reload by itself (it is a single page application)
- the page should not need to be reloaded to work
- **use Javascript modules exclusively**
- separates the **Frontend Controller** from **the Frontend API** as seen in the Javascript lab
- correct coding style, indentation and comments (whenever appropriate)
- all icons, images and other design elements are appropriately credited in `credits.html`.
- all code found online and adapted are appropriately credited as comments

You must commit your final version of the code on the `master` branch Github repository created through Classroom 50. It is strongly encourager to use your Github repo to commit commit early and push often your code. 

## Designing the UI

In this part, you are going to design the UI (HTML and CSS) of _The Web Gallery_ app. Our UI to contain the following components:

1. **the add-image form** allows users to add a picture from the web to the gallery by copying and pasting its url into the form (we will enable file upload in the next assignment). This component should contain at least:
   - a button to toggle (show/hide) the add-image form
   - an input form for the image title
   - an input form for the author's name
   - an input form for the image url
2. **the image display** shows current image. This component should contain at least:
   - the image currently displayed
   - the image title
   - the image author
   - two buttons to move to the previous and next image in the gallery
   - a delete button
3. **the comment form** allows users to add comments to the current picture. This component should contain at least:
   - an input form for the author's name
   - an input form for the text of the comment
4. **the comment section** that shows the most recent comments for the current picture. This component should contain at least:
   - the 10 most recents comments only. Each comment should be composed of:
     - the author's name
     - the date when the comment was posted
     - the text
     - a delete button
   - two buttons to move to the older or later series of 10 comments (still related to the same image)

> [!IMPORTANT]
> Your styling must be elegant, original (i.e must not resemble the style from lectures and labs) and use some CSS animations.

## Building the features

In this part, you are going to build some frontend features. Data will be stored locally (HTML5 storage) and updated when users interacts with the app. The data should be persistent. This means that any comment or image previously added should appear (wherever appropriate) when the user browse through the gallery even if the page is reloaded.

> [!WARNING]  
> Ensure that even when you do localStorage.clear(), the app should still work as expected.

As done for the lab, the javascript code must be separated in two: the **Frontend Controller** and the **the Frontend API**. For the **Frontend API** api, we provide a starter file called `api.mjs`.

### Adding and deleting images to the gallery

Users should be able to toggle (show/hide) the add-image form as needed. When the gallery is empty, only the toggle button should show (and the add-image form if toggled on).

Once the form is submitted, the image should be added to the gallery and the page should show that image as the current displayed image. Finally, the form should be cleared automatically to allow a new entry.

Users should be able to delete any image in the gallery.

### Browsing through the gallery

Only one image should be displayed in the page along with its title and author. Users should be able to navigate to the previous or next image in the gallery using the previous and next button of the page.

Users should be able to delete an image by clicking on the delete button. Once the image is deleted either the previous or next image in the gallery is shown (if any).

> [!WARNING]
> Although all data are currently stored locally, we do not want to load all gallery images at once into the DOM. Our goal is to build a responsive web gallery that can handle a large amount (hundreds) of images. Therefore, we prefer to update the DOM with only the relevant data as the user navigates through the gallery. This means that we should not use _out of the box_ HTML and CSS sliders since they require to load all images in the DOM.

### Commenting on images

Users should be able to add a comment to the picture that is currently displayed using the comment form. Once submitted, the form should be cleared to allow a new entry.

As users browse through the gallery, the comment section should be updated to display the comments associated with the displayed image only. Each comment should contain the name, the creation date (that was automatically added) and the content.

The comment section should only show that last 10 comments with the most recent on top. The users can navigate through all comments by using buttons that will show the previous or next 10 comments for displayed image.

Users should be able to delete any comment.