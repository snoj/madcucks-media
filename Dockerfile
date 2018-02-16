FROM keymetrics/pm2:8-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir /usr/src && mkdir /usr/src/app

ADD . /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install

EXPOSE 5000

CMD ["pm2-runtime", "start", "process.yml"]
