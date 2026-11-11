#!/bin/bash

for i in {1..100000}; do curl -X POST -d 'hello' http://localhost:3000/messages/; done