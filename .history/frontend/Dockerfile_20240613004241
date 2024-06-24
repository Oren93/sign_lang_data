# Use an official Node.js runtime as a parent image
FROM node:21

# Set working directory for caching node_modules
WORKDIR /cache

# Install app dependencies
COPY package*.json ./
RUN npm install 

# Set working directory for the app
WORKDIR /app
ENV NODE_OPTIONS --openssl-legacy-provider
ENV PATH /app/node_modules/.bin:$PATH

# Copy app source code
COPY . .

# Build the React application
RUN npm run build



# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run", "dev"]

