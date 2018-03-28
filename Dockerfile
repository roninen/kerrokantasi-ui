FROM node:alpine

# At this stage everything might be useful

COPY .

EXPOSE 8086

# Create config from env and serve web root with httpd
CMD npm start
