FROM node:24-slim 

RUN mkdir -p /home/app
WORKDIR /home/app
COPY ./src ./
RUN npm install

EXPOSE 3000
CMD ["npm","run","prod"]