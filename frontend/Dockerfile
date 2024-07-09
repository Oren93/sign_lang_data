# Use an official Node.js runtime as a parent image
FROM node:21

# Create and define the node_modules's cache directory.
WORKDIR /cache

# install app dependencies
COPY package*.json ./
RUN npm install 

ENV NODE_OPTIONS --openssl-legacy-provider
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . .
EXPOSE 3001
