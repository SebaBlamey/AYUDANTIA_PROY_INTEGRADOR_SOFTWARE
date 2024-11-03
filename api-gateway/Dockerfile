FROM node:latest

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

RUN yarn build

EXPOSE 3001

CMD ["node", "dist/main.js"]
