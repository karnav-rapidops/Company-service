# Specify a base image to work with container
FROM node:alpine

WORKDIR /usr/app

# Copy source-code and packege-files
COPY package*.json ./

# install all dependencies inside container which are specified in package.json file 
RUN npm install

COPY ./ ./

# Expose port
EXPOSE 3000

# Give a start-up command to container
CMD ["node", "src/index.js"]


