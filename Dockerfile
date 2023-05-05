FROM node:14-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY package.json ./

RUN npm install
# Install knex
RUN npm install -g knex

# migrate table
# RUN knex migrate:latest

COPY . .

# EXPOSE 3030

CMD node bin/www