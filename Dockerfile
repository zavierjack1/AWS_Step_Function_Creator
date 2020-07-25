#Node+Mocha
FROM node
#COPY ./ /NodeJS-Express/
#WORKDIR /NodeJS-Express
RUN apt-get update
RUN apt-get install vim -y
RUN npm install
RUN npm install mocha -g
CMD bash