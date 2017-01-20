#!/bin/bash

curl -X POST -d 'content=Hello%20&author=me' localhost:3000/api/messages/
curl -X POST -d 'content=Hello%20&author=me' localhost:3000/api/messages/
curl -X POST -d 'content=Hello%20&author=me' localhost:3000/api/messages/

curl localhost:3000/api/messages/1/

curl -X DELETE localhost:3000/api/messages/1/
