---
layout: default
permalink: work/assignments/3/rubric/
---

---
**Grade (TA only)**

- max: 100
- score:

---

# Assignment 3: Rubric

**Important**: This rubric is a guideline for marking and should not be considered as binding. It means that the course staff reserves the right to:

- modify the rubric after the submission deadline
- assign more or less weight to each rubric elements when it comes to give a score

Complete this rubric by filling the blanks and selecting options using an `x` whenever it is appropriate. Here is an example that you should modify as well:

1. My name is [firstname] ____john____ and this rubric is [select one]: 
    - _ missing 
    - _ incomplete for the most part 
    - _ badly filled for several questions
    - x good but couple of questions were not filled or wrongly filled
    - _ perfect 

## Academic integrity declaration

I hereby declared that the work submitted here is mine and its production complies with 

1. the Code of Behaviour on Academic Matters of University of Toronto
1. and the course policy (see website)

[date] ___________________________

[signature or initials] __________

## Authenticated Users and Multiple Galleries

---
**Grade (TA only)**

- max1: 50
- score1:
 
---


1. The API support for supporting users and multiple galleries: [select one]
    - _ is unimplemented 
    - _ is somehow implemented but does not realized its main functionality overall
    - _ does achieve its main functionality overall but several features are missing
    - _ does work well but couple of features are missing or not working properly
    - _ does work very well overall and all features are properly implemented

    In the box below, write down the features that you were not able to implement or make it work properly:  
    **Comments**
    ```
    your comments go here. 
    ```

1. Through the application, users can: [select many]
    - _ sign in
    - _ sign out
    - _ sign up

1. Authentication: [select many]
    - _ credentials are sent over using POST/PUT requests when signing up
    - _ credentials are sent over using POST requests when signing in
    - _ passwords are stored as salted hashes
    - _ session authentication is implemented and correctly used

1. Authorization policy: [select many]
    - _ Non authenticated cannot read any picture nor comment
    - _ Non-authenticated can sign-up and sign-in into the application
    - _ Authenticated users can sign-out of the application
    - _ Authenticated users can browse any gallery
    - _ Gallery owners can upload and delete pictures to their own gallery only
    - _ Authenticated users can post comments on any picture of any gallery
    - _ Authenticated users can delete any one of their own comments but not others
    - _ Gallery owners can delete any comment on any picture from their own gallery

In the box below, write any comment you would like to communicate the TA regarding the work done for this part:

**Comments**
```
your comments go here. 
```

## Web Security

---
**Grade (TA only)**

- max2: 20
- score2:
 
---

1. HTTPS is: [select one]
    - _ not enabled
    - _ enabled but HTTP is not disabled
    - _ enabled and HTTP is disabled
    
1. The certificate: [select many]
    - _ is missing
    - _ contains incomplete and/or irrelevant information
    - _ contains complete and relevant information

1. User's inputs: [select one]
    - _ none of them are validated nor sanitized
    - _ some inputs are validated and/or sanitized but most of them are not
    - _ most inputs are validated and/or sanitized but couple of them are not
    - _ all are validated and sanitized
    
3. Cookies [select many]
    - _ the authentication has the `HttpOnly` flag 
    - _ all cookies have the `Secure` flag
    - _ all cookies have the `SameSite` flag

In the box below, write any comment you would like to communicate the TA regarding the work done for this part:

**Comments**
```
your comments go here. 
```

## Frontend Update

---
**Grade (TA only)**

- max3: 10
- score3:
 
---


1. The frontend: [select one]
    - _ is not updated 
    - _ is somehow updated but does not implement most features overall
    - _ is updated but several features are missing
    - _ is updated but couple of features are missing or are not working properly
    - _ is updated and all features are properly implemented


    In the box below, write down the features that you were not able to implement or make it work properly:  
    **Comments**
    ```
    your comments go here. 
    ```
 
In the box below, write any comment you would like to communicate the TA regarding the work done for this part:

**Comments**
```
your comments go here. 
```

## API Documentation

---
**Grade (TA only)**

- max4: 5
- score3:
 
---

In the box below, write any comment you would like to communicate the TA regarding the work done for this part:

1. The documentation: [select one]
    - _ is not updated 
    - _ is somehow updated but several details are missing
    - _ is updated but couple of details are missing
    - _ is updated and all details are 

    In the box below, write down the features that you were not able to implement or make it work properly:  
    **Comments**
    ```
    your comments go here. 
    ```

**Comments**
```
your comments go here. 
```

## Code quality and organization

---
**Grade (TA only)**

- max5: 15
- score3:
 
---

1. The repository is overall: [select one]
    - _ not following the required structure
    - _ follows the required structure but some files are either misplaced, wrongly named or misspelled
    - _ well organized    
    
1. The Javascript code: [select many]
    - _ is clean, well organized and indented properly
    - _ does not contain any error from JSHint
    - _ does not contain any warning from JSHint
    - _ does not repeat itself (DRY principle) and is easily maintainable
    
1. When the app executes: [select many]
    - _ it does not generate superfluous debugging messages in the console (both in the frontend and the backend)
    - _ it does not generate error messages in the console (both in the frontend and the backend)
 
1. Overall, the application code: [select one]
    - _ is poorly implemented
    - _ is fairly well implemented
    - _ is good
    - _ is excellent
    - _ is beyond expectations 
    
In the box below, write any comment you would like to communicate the TA regarding the work done for this part: 

**Comments**
```
your comments go here. 
```
