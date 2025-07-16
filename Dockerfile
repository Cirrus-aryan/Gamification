# Stage 1: Build the React application
# Use a Node.js image as the base for building the React app.
FROM node:20-alpine AS build

# Set the working directory inside the container to the root of the frontend application.
# This ensures all subsequent commands operate within the frontend's directory structure.
WORKDIR /app/frontend

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker layer caching.
# This ensures that npm install only runs if package.json changes.
# The source path 'Frontend/package*.json' is relative to the Docker build context (your project root).
# The destination './' is relative to the current WORKDIR (/app/frontend).
COPY Frontend/package*.json ./

# Copy the frontend's .env file into its working directory inside the container.
# This assumes your frontend's .env is located at 'Summerizer/Frontend/.env' on your host.
# Vite will pick up VITE_ prefixed variables from this .env during the build.
COPY Frontend/.env ./

# Install project dependencies.
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code into the container.
# The source path 'Frontend/.' is relative to the Docker build context.
# The destination './' is relative to the current WORKDIR (/app/frontend).
COPY Frontend/. .

# Build the React application for production.
# This command typically creates a 'dist' folder with static assets for Vite projects.
# The output will be located at /app/frontend/dist (relative to the container's root).
RUN npm run build

# Stage 2: Serve the built application using 'serve'
# Use a lightweight Node.js image to serve the static files.
FROM node:20-alpine

# Set the working directory inside the container where 'serve' will look for files.
WORKDIR /usr/src/app

# Install 'serve' globally.
RUN npm install -g serve

# Copy the built React application from the 'build' stage.
# The source path '/app/frontend/dist' must precisely match the output directory
# from your 'npm run build' command in the first stage.
COPY --from=build /app/frontend/dist ./

# Expose port 80, which is the default port 'serve' listens on.
# UPDATED: Frontend now exposes internal port 80
EXPOSE 80

# Command to run the 'serve' application.
# '-s' serves a single-page application, redirecting all requests to index.html.
# '-l 80' specifies that 'serve' should listen on port 80.
# UPDATED: 'serve' now listens on port 80
CMD ["serve", "-s", "-l", "80"]