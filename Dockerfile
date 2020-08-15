#Node+Mocha
FROM node
COPY ./aws_step_functions /aws_step_functions
WORKDIR /aws_step_functions
RUN apt-get update
RUN npm install
CMD bash

#run the following 
#docker container run -d --name ownUpContainer -it zavierjack1/aws_step_function_image /bin/bash
#docker exec -it ownUpContainer bash
#****in container****
#npm test