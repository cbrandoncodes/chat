# Use official Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy monorepo package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy the rest of the monorepo (Dockerignore will help keep size down)
COPY . .

# Install dependencies (workspace-aware)
RUN yarn install --frozen-lockfile

WORKDIR /app/apps/server
RUN yarn build

# Expose server port
EXPOSE 7070

# Start the backend
CMD ["yarn", "start"]