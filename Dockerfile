FROM node:alpine

COPY .

EXPOSE 8086

# Create config from env and serve web root with httpd
CMD npm start
