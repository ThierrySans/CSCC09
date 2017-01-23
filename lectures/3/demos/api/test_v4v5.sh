#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{"content":"Hello 0","author":"me"}' localhost:3000/api/messages/
curl -H "Content-Type: application/json" -X POST -d '{"content":"Hello 1","author":"me"}' localhost:3000/api/messages/
curl -H "Content-Type: application/json" -X POST -d '{"content":"Hello 2","author":"me"}' localhost:3000/api/messages/

curl localhost:3000/api/messages/1/

curl -X DELETE localhost:3000/api/messages/1/