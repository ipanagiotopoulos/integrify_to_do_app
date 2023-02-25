from node:lts-alpine
WORKDIR /integrify_code
ADD package.json package-lock.json /integrify_code/
ADD . /integrify_code/
CMD [ "CD","/integrify_code" ]
RUN npm install --save express
RUN npm install


