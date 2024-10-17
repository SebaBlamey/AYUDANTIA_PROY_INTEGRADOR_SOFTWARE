FROM node:18

WORKDIR /usr/src/app

COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "start:prod"]
