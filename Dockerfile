FROM node:14-alpine

RUN apk update && apk add bash

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json ./

RUN npm install
# Install knex
RUN npm install -g knex

COPY . .

EXPOSE 8090

# CMD node bin/www
CMD ["sh", "-c", "knex migrate:latest && npm start"]

curl --location --request DELETE 'http://172.17.0.3:3030/todo-items/21' \
--data '{
    "title": "testing"
}'

curl --location --request PATCH 'http://172.17.0.3:3030/activity-groups/1' \
--data '{
    "title": "testing"
}'