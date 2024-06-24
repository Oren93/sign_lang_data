# Use an official Node.js runtime as a parent image
FROM node:21

# Create and define the node_modules's cache directory.
WORKDIR /cache

# install app dependencies
COPY package*.json ./
RUN npm install 

WORKDIR /app
ENV NODE_OPTIONS --openssl-legacy-provider
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
EXPOSE 3001
