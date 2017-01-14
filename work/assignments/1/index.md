---
layout: default
permalink: work/assignments/1/
---

The objective of these assignments is to build an application called *The Web Gallery* where users can share pictures and comments. This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr. 

# Assignment 1: Building the front-end

In this first assignment, we will concentrate on the front-end only and our app will have two URLs:

- `/index.html` is the main page where users can browse through images, add new images and comment. 

- `/credits.html` is the credits page that should contains the references of the images, buttons and snippets of code that you have used used for this assignment.

## Instructions

For this assignment, you are **not** allowed to: 

- use any CSS template 
- use any javascript library or framework
- use or develop any server-side feature

### Code quality and organization

All of your work should be placed into a directory called `app`. This directory must be organized as follows: 

- `app/index.html`
- `app/credits.html`
- `app/js`: all javascript files
- `app/style`: all css files
- `app/media`: all media files related to the UI (images, icons and so on)

Your code muts be of good quality and follow all recommendations given throughout the course. In this assignment, it means (non exhaustive): 

- not use of deprecated HTML tags
- proper use of id and class attributes
- the page never need to be reloaded (neither by itself or by the user)
- use encapsulation (closure) and strict mode for Javascript code
- use of JSHint to validate Javascript code
- use the MVC structure as seen in class and in lab 2
- correct coding style, indentation and comment
- all icons, images and other design elements are appropriately credited in `credits.html`.
- all code found online and adapted are appropriately credited as comments

Remember, any code found online and improperly credited can constitute an academic violation. 

### Marking 

In addition to submitting the app, students must fill and submit the grading rubric for this assignment. This grading rubric is decomposed as follows: 

- **UI**: 40 points (10 for each component)
- **Features**: 40 points (10 for each feature)
- **Code quality and organization** 20 points - it includes quality of
- **Neatness**: 20 bonus points

The *Neatness* points will be granted to exceptional submissions only. To be considered, the application must work perfectly and its code being of excellent quality in the first place. No *Neatness* point will be granted to an incomplete or badly written web application. 

In this assignment, *Neatness* points might be granted subjectively for (list non-exhaustive):

- an outstanding CSS design
- improved features (for instance: use drag'd drop instead of a file upload form, HTML5 form validation and so on)
- any extra feature as long as they are well implemented, not artificial and significant (for instance: video upload, being able to draw on image using the mouse and so on)

The best applications might be showcased in class. 

### Submission

You should submit your app and its grading rubric through your Github course repository. Your repository should be organized as follows:

- `assignment\1\app` 
- `assignment\1\rubric.pdf`

Before submitting your final version. It is strongly recommended to verify that your code is portable. To do so: 

- push your work to Github
- clone it into another machine
- verify that your app works as expected

## Designing the UI 

In this part, you are going to design the UI (HTML and CSS) of *The Web Gallery* app. Our UI to contain the following components: 

1. **the uploader form** allows users to add picture to the gallery either by uploading a file or entering an image URL. This component should contain at least: 
    - a button to toggle (show/hide) the uploader form
    - an input form for the image title
    - an input form for the author's name
    - a radio button to select between file upload or URL
    - an upload form for the file upload option
    - an input form for the url option
    
1. **the display** shows current image. This component should contain at least: 
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

In this part, you are going to build the application features to work on the browser. Data will be stored locally and updated when users interacts with the app. The data should be persistent as long as the page is not reloaded by the user (it should not reload by itself). This means that any comment or image previously added should appear (wherever appropriate) when the user browse through the gallery.

### Image upload

Users should be able to toggle (show/hide) the uploader form as needed. When the gallery is empty, only the toggle button should show (and the image uploader if toggled on). 

Once the form is toggled on, users should be able to select whether they want to add an image by uploading a file or use a URL. Once the option is selected, the form should show the appropriate form element either a file uploader form or an URL input but not both. 

Once the form is submitted, the image should be added to the gallery the page should show that image as the current displayed image. Finally, the form should be cleared automatically to allow a new entry.

### Image browsing

Only one image should be displayed in the page along with its title and author. Users should be able to navigate to the previous or next image in the gallery using the previous and next button of the page. 

Users should be able to delete an image by clicking on the delete button. Once the image is deleted either the previous or next image in the gallery is shown (if any). 

Although all data are currently stored locally, we do not want to load all gallery images at once into the DOM. Our goal is to build a responsive web gallery that can handle a large amount (hundreds) of images. Therefore, we prefer to update the DOM with only the relevant data as the user navigates through the gallery. This means that we should not use *out of the box* HTML and CSS sliders since they require to load all images in the DOM.

### Comments

Users should be able to add a comment to the picture that is currently displayed using the comment form. Once submitted, the form should be cleared to allow a new entry.

As users browse through the gallery, the comment section should be updated to display the comments associated with the displayed image only. Each comment should contain the name, the creation date (that was automatically added) and the content. 

The comment section should only show that last 10 comments with the most recent on top. The users can navigate through all comments by using buttons that will show the previous or next 10 comments for displayed image.

Users should be able to delete any comment using the delete button.  

### Navigation

Each image should be associated with a fixed id number that does not change as users add or delete images. 

As the user navigates through the gallery, the url should be changed automatically (without the page being refreshed) to reflect the image id that is currently displayed on the page. For instance, if the image id 4 is currently displayed, the url should be "/index.html?id=4".

Knowing an image id, users can enter the corresponding url to show the image. Deleted image id should not longer be accesible and a 404 message should appear.




