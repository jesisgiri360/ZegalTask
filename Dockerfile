# Use an official Node.js runtime as a parent image
FROM node:16.5.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Nest.js dependencies
RUN npm install --force
RUN npm run build

# Expose the port that the Nest.js application will run on (if needed)
# EXPOSE 3000

# Set environment variables (RabbitMQ connection info)
ENV NODE_ENV development
ENV TZ=Asia/Kathmandu
ENV RABBITMQ_HOST=rabbitmq
ENV RABBITMQ_PORT=5672
ENV RABBITMQ_USER=guest
ENV RABBITMQ_PASSWORD=guest
ENV RABBITMQ_QUEUE_NAME=zegal-task

# Define the command to run your Nest.js application
CMD ["npm", "run", "start"]
