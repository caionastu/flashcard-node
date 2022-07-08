FROM node:alpine as base

RUN apk add --no-cache git
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY tsconfig.json /app
COPY src /app/src

RUN yarn install
RUN yarn build

FROM base

RUN yarn install --production
COPY --from=base ./app/build ./build

EXPOSE 3000
EXPOSE 27017

CMD ["node", "./build/server.js"]