---
layout: default
permalink: /labs/04/doc
---

# Microblog REST API Documentation

## Message API

### Create

- description: create a new message
- request: `POST /api/messages/`
    - content-type: `application/json`
    - body: object
      - content: (string) the content of the message
      - author: (string) the authors username
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"content":"hello world","author":"me"} 
       http://localhsot:3000/api/messages/'
```

### Read

- description: retrieve the last 5 messages 
- request: `GET /api/messages/[?limit=5]`   
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
 
``` 
$ curl http://localhsot:3000/api/messages/
``` 
  
###  Update

- description: retrieve the message id
- request: `GET /api/messages/:id/`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
- response: 404
    - body: message id does not exists

``` 
$ curl http://localhsot:3000/api/messages/jed5672jd90xg4awo789/
``` 
  
### Update

- description: upvote or downvote the message id
- request: `PATCH /api/messages/:id/`
    - content-type: `application/json`
    - body: object
      - action: (string) either `upvote` or `downvote`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
- response: 204
    - body: invalid argument
- response: 404
    - body: message :id does not exists
  
``` 
$ curl -X PATCH 
       -H 'Content-Type: application/json'
       -d '{"action":"upvote"} 
       http://localhsot:3000/api/messages/jed5672jd90xg4awo789/'
```
  
  
### Delete
  
- description: delete the message id
- request: `DELETE /api/messages/:id/`
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the message id
        - content: (string) the content of the message
        - author: (string) the authors username
        - upvote: (int) the number of upvotes
        - downvote: (int) the number of downvotes
- response: 404
    - body: message :id does not exists

``` 
$ curl -X DELETE
       http://localhsot:3000/api/messages/jed5672jd90xg4awo789/
``` 