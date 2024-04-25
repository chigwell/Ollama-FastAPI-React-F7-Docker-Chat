# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app/
RUN npm install

# Bundle app source including the public and src directories
COPY ./public /app/public
COPY ./src /app/src

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]
