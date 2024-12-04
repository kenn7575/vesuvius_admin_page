# Use the official Node.js 18 image as the base
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
