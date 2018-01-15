---
layout: default
permalink: /assignments/01/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr. 

# Building the front-end

In this first assignment, we will concentrate on the front-end only. Users will be able to add images to the gallery 

 our app will have two URLs:

- `/index.html` is the main page where users can browse through images, add new images and comment. 

- `/credits.html` is the credits page that should contains the references of the images, buttons and snippets of code that you have used used for this assignment.

## Instructions

For this assignment, you are **not** allowed to: 

- use any CSS template 
- use any javascript library or framework
- use or develop any server-side feature

### Code quality and organization

All of your work should be placed into a directory called `assignments/01/webgallery`. This directory must be organized as follows: 

- `app/index.html`
- `app/credits.html`
- `app/js`: all javascript files
- `app/style`: all css files
- `app/media`: all media files related to the UI (images, icons and so on)

Your code must be of good quality and follow all recommendations given throughout the course. In this assignment, it means (non necessarily exhaustive): 

- no use of deprecated HTML tags
- proper use of id and class attributes
- the page does not reload by itself 
- the page should not need to be reloaded to work
- use encapsulation (closure) and strict mode for Javascript code
- use of JSHint to validate Javascript code
- separates the **Frontend Controller** from **the Frontend API** as seen in Javascript lab
- correct coding style, indentation and comments (whenever appropriate)
- all icons, images and other design elements are appropriately credited in `credits.html`.
- all code found online and adapted are appropriately credited as comments

### Submission

You should submit your work to your Github course repository. Before submitting your final version. It is strongly recommended to verify that your code is portable. To do so: 

- push your work to Github
- clone it into a new directory
- start your app and verify that it works as expected

## Designing the UI 

In this part, you are going to design the UI (HTML and CSS) of *The Web Gallery* app. Our UI to contain the following components: 

1. **the add-image form** allows users to add a picture from the web to the gallery by copying and pasting its url into the form (we will enable file upload in the next assignment). This component should contain at least: 
    - a button to toggle (show/hide) the add-image form
    - an input form for the image title
    - an input form for the author's name
    - an input form for the image url
    
1. **the image display** shows current image. This component should contain at least: 
    - the image currently displayed
    - the image title
    - the image author
    - two buttons to move to the previous and next image in the gallery
    - a delete button
    
1. **the comment form** allows users to add comments to the current picture. This component should contain at least: 
    - an input form for the author's name
    - an input form for the text of the comment

1. **the comment section** that shows the most recent comments for the current picture. This component should contain at least: 
    - the 10 most recents comments only. Each comment should be composed of:
        - the author's name
        - the date when the comment was posted
        - the text
        - a delete button
    - two buttons to move to the older or later series of 10 comments (still related to the same image)

##  Building the features

In this part, you are going to build some frontend features. Data will be stored locally (HTML5 storage) and updated when users interacts with the app. The data should be persistent. This means that any comment or image previously added should appear (wherever appropriate) when the user browse through the gallery even if the page is reloaded. 

As done for the lab, the javascript code must be separated in two: the **Frontend Controller** and the **the Frontend API**. For the **Frontend API** api, we provide a starter file called `api.js`. Your implementation of the **the Frontend API** will be auto-marked, so make sure to comply with the specifications. However, feel free to add additional functions and object attributes if needed by your implementation. 

### Adding and deleting images to the gallery

Users should be able to toggle (show/hide) the add-image form as needed. When the gallery is empty, only the toggle button should show (and the add-image form if toggled on). 

Once the form is submitted, the image should be added to the gallery and the page should show that image as the current displayed image. Finally, the form should be cleared automatically to allow a new entry.

Users should be able to delete any image in the gallery. 

### Browsing through the gallery

Only one image should be displayed in the page along with its title and author. Users should be able to navigate to the previous or next image in the gallery using the previous and next button of the page. 

Users should be able to delete an image by clicking on the delete button. Once the image is deleted either the previous or next image in the gallery is shown (if any). 

Although all data are currently stored locally, we do not want to load all gallery images at once into the DOM. Our goal is to build a responsive web gallery that can handle a large amount (hundreds) of images. Therefore, we prefer to update the DOM with only the relevant data as the user navigates through the gallery. This means that we should not use *out of the box* HTML and CSS sliders since they require to load all images in the DOM.

### Commenting on images

Users should be able to add a comment to the picture that is currently displayed using the comment form. Once submitted, the form should be cleared to allow a new entry.

As users browse through the gallery, the comment section should be updated to display the comments associated with the displayed image only. Each comment should contain the name, the creation date (that was automatically added) and the content. 

The comment section should only show that last 10 comments with the most recent on top. The users can navigate through all comments by using buttons that will show the previous or next 10 comments for displayed image.

Users should be able to delete any comment. 




