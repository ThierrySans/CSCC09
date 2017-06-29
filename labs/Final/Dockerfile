FROM node

RUN apt-get update && apt-get install -y memcached

RUN mkdir -p /home/nodejs/app
COPY ./app /home/nodejs/app
WORKDIR /home/nodejs/app
RUN npm install --production

CMD service memcached start && node app.js
