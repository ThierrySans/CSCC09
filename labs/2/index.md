---
layout: default
permalink: /labs/2/
---

# Lab 2: HTML & CSS

In this lab, we are going to make your first steps with HTML and CSS. Your goal is to design the UI of our Microblog app. This app should look like similar to the following screenshot:

<div class="screenshot"><img src="screenshots/main.png" alt="Main"/></div>

This handout is meant to guide your learning experience by giving you problems to solve. However, it it will not tell you how to solve these problems. In most cases, you will need to find the solution on your own. Doing so, you should address your questions to **Google** first followed by **your TA**. 

###  Recommended work setup

You can work on your own laptop or on any linux lab machine. This lab has a starter code that can be found on the course Github repository `https://github.com/ThierrySans/cscc09-w17/labs/2/microblog`. Therefore, we recommend you to copy the starter code into your Github repository and work from there. In addition, we recommend you to work with [browser-sync](https://www.browsersync.io/) to automatically refresh your browser once any of your file is saved. 

To setup your workspace, follow these steps: 

1. clone the Github course repository:
    
    ```
    $ git clone https://github.com/ThierrySans/cscc09-w17
    ```

1. clone your own repo:
    
    ```
    $ git clone https://github.com/UTSCC09/_your_utorid_
    ```

1. copy today's lab into your repository: 
    
    ```
    $ mkdir -p _your_utorid_/labs/2/
    $ cp -R cscc09-w17/labs/2/microblog _your_utorid_/labs/2/
    ```

1. move to today's lab starter code:

    ```
    $ cd _your_utorid_/labs/2/microblog
    ```

1. start browser-sync to monitor the starter code directory:

    ```
    $ browser-sync start --server --no-online --files="**/*"
    ```
    
At this point, you should have an open tab in your Chrome browser with the URL: `http://localhost:3000/`. From now on, we recommend you to keep the Chrome developper's console opened (menu view -> Developer -> Developer Tools).  

### Submission

All of your work should be done through your local copy of your Github repository. Once you are done with the lab, push your work to Github:

```shell
$ git add labs/2/
$ git commit -m "Final submission for Lab 2"
$ git push
```

## 1. Setting up the web application

As you can see so far, our web application is stretching to the maximun size of the browser window. Depending on how you design your web application, it might look completely different with other size of browser window. Ideally, we would like our web application to be [responsive](https://en.wikipedia.org/wiki/Responsive_web_design) to work on any screen size (including mobile devices). However, this is something more advanced that will be covered later this semester. For now, we will just fix the browser window width to a size that should work on most computer screens. 

**Task:** Modify the CSS file `main.css` to fix the width of the `body` element using the following properties:

```shell
    max-width: 800px;   /* set the body to be 800px long */
    margin: auto;       /* center the app in the middle of the browser window */ 
```

At this point, you should see the Microblog application centered with a fixed width. 

## 2. Working with HTML Forms

The main page contains an example of an HTML form. So far, this form contains an input element that asks the user to enter a name. We want to modify this form to post a longer message instead of a name.   

**Task:** Without modifying the CSS file `form.css`:  
1. replace the input form with a `textarea` element that matches the style defined by the class `form_element` in the `form.css` file. The textarea placeholder should now be *"enter your message*".
1. add a input button of type submit that matches the style defined by the class `btn` the `form.css` file. 

At this point, the user should be able to fill the form and hit the button submit. This action will make the page to refresh for now. In the next lab, we will learn how to attach a Javascript method to the submit action. 

## 3. Building an HTML structure

The goal of our app is to show all posted messages on the main page below the form. As shown on the screenshot above, each message contains the following elements: 

1. the name of the user who posted the message
1. the user profile picture
1. the message content
1. two buttons for up-voting and down-voting the message with their respective counts

**Task:** Define an HTML data structure for a message and add two examples of these messages in the main page below the message form. For now, you can set the user profile picture to the default one found in `media/user.png`. 

At this point, you should see all of elements being stacked up in a non organized way. 

## 4. Understanding CSS

In this part, you are going to style your messages. To position the HTML elements, we recommend to use the [Flexbox CSS layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). 

**Task:** Complete the file "main.css" to style your messages. You should place all elements in a similar way as shown in the screenshot above. However, feel free to experiment further with CSS come up with your own style. 

At this point, your messages should show on the page in an elegant way. 

## 5. Dealing with images

There are two ways to place an image into a page:

1. by using the HTML element `img` and a reference attribute to the image source,
1. or by adding an image background to an HTML element with CSS

As a good practice, it is recommended to use the CSS method for all images that belongs to the UI and reserve the use of the `img` HTML tags to all images that are related to your data. 

For instance, the header section contains a profile button that is not shown because there is no image attached to it. Since it is part of the UI, we will use the CSS method method to attach an image to this button. 

**Task 1:** Without modifying the HTML file, use the CSS method to attach the image `media/user.png` to the background of the profile button button. 

In contrary, the user profile images contained in the messages are related to the data. Therefore, we prefer to use the `img` HTML elements for these images. For each message, let us change the image profile with a specific one as shown on the screenshot above. You can use any image found on the internet as long as it is free of use *and* that you correctly credit its author. For instance, you can find these image on websites such as: 

- [Creative Commons](https://search.creativecommons.org/)
- [Flaticon](http://www.flaticon.com/)

For any image you use, you should credit its author on the credits page of you app (`credits.html`). 

**Task 2:** Change the two profile pictures of your messages by

1. downloading two free of use images from the web in a new directory that you will call `uploads`
1. use these images in your messages  
1. add the corresponding credits to the credits page

## 6. Setting up the profile page

**Task:** Create a profile page that allows the user to change its name and profile picture as shown on the screenshot below. The user can select to either provide a URL to the profile picture or upload an image file.

<div class="screenshot"><img src="screenshots/profile.png" alt="Main"/></div>

At this point, the user should be able to:

- fill the form and hit the button submit. This action will make the page to refresh for now. 
- click on the close button in the right top corner to go back to the main page. 





