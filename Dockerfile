FROM keymetrics/pm2:8-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir /usr/src && mkdir /usr/src/app && mkdir /usr/src/app/client

COPY package.json yarn.lock /usr/src/app/
COPY ./client/package.json ./client/yarn.lock /usr/src/app/client/
WORKDIR /usr/src/app

RUN yarn install

ADD . .

RUN yarn build-client

EXPOSE 5000

CMD ["pm2-runtime", "start", "process.yml"]
