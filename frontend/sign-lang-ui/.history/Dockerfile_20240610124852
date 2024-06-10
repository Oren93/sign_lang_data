# Use an official node image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the current directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the current directory
COPY . .

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3002

# Start the application
CMD ["npm", "start"]


