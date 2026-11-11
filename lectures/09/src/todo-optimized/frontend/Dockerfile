FROM node:24-slim AS build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY build.mjs ./

FROM nginx:1.29-alpine-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
