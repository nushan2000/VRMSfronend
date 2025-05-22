# FROM node

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .
# EXPOSE 3000

# CMD ["npm" , "start"]

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Define build arguments
ARG REACT_APP_API_URL


# Set environment variables
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci 

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm", "start"]