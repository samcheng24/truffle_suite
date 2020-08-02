# Use the official Node.js image as parent image
FROM node:10.22.0

WORKDIR /app
ENV PORT 3000
EXPOSE ${PORT}
COPY ./package.json /app/package.json
RUN npm install
COPY . /app

# Start the app
CMD ["npm", "test"]