#!/bin/bash

curl -X POST -d 'Hello 0' localhost:3000/api/messages/
curl -X POST -d 'Hello 1' localhost:3000/api/messages/
curl -X POST -d 'Hello 2' localhost:3000/api/messages/

curl localhost:3000/api/messages/1/

curl -X DELETE localhost:3000/api/messages/1/

curl localhost:3000/api/messages/2/