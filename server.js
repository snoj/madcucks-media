const express = require('express');
const Promise = require('bluebird');
const fetch = require('node-fetch');
const parsePodcast = require('node-podcast-parser');
const redis = require('redis');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const  Queue = require('bull');
const log4js = require('log4js');

var logger = log4js.getLogger();

logger.level = 'ALL';


const rssQueue = new Queue('rss refresher', 'redis://127.0.0.1:6379');

const redisHost = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
const redisPort = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort
});

const app = express();
const port = process.env.PORT || 5000;

const showList = ["thedickshow","thatlarryshow","lawsplaining","hwidg","sciencefriction","realnerdhours","biggestproblem"];

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
});

app.get('/api/shows/', (req, res) => {

    logger.info("Received request: /api/shows");

    let aggregateShowInfo = [];

    let promiseArr = showList.map((showName) => {
        logger.debug(showName);
            return redisClient.getAsync(showName)
                        .then((reply) => {
                            logger.debug("Got data for " + showName + "from Redis");
                            let rssjson = JSON.parse(reply);
                            delete rssjson.episodes;
                            rssjson.showName = showName;
                            aggregateShowInfo.push(rssjson);
                        })
                        .catch((err) => {
                            logger.error(err);
                        });
    });

    Promise.all(promiseArr)
        .then(() => {
            logger.trace("All promises have resolved");
            aggregateShowInfo.sort((a, b) => {
                return (a.title > b.title) ? -1 : ((a.title < b.title) ? 1 : 0);
            });
            res.json(aggregateShowInfo);
        })
        .catch((err) => {
            logger.error(err);
        });

});

app.get('/api/shows/:showName', (req, res) => {

    const showName = req.params.showName;
    let url = '';

    switch(showName) {
        case "thedickshow":
            url = 'http://thedickshow.libsyn.com/thedickshow';
            break;
        case "thatlarryshow":
            url = 'http://thatlarryshow.com/feed/podcast/';
            break;
        case "lawsplaining":
            url = 'http://feeds.soundcloud.com/users/soundcloud:users:187351634/sounds.rss';
            break;
        case "hwidg":
            url = 'http://hereswhatidontget.com/podcast?format=rss';
            break;
        case "sciencefriction":
            url = 'http://sciencefriction.libsyn.com/rss';
            break;
        case "realnerdhours":
            url = 'http://feeds.soundcloud.com/users/soundcloud:users:280249740/sounds.rss';
            break;
        case "biggestproblem":
            url = 'http://biggest.thedickshow.com/feed/podcast';
            break;
        default:
            res.status(400).send({
                error: "Show specified doesn't exist"
            });
            return;
    }

    redisClient.exists(showName, (err, reply) => {
        if(!err) {
            if(reply) {
                console.log('Key: ' + showName + ' exists');
                redisClient.get(showName, (err, reply) => {
                    if(!err) {
                        res.json(JSON.parse(reply));
                    }
                });
            } else {
                console.log("Key " + showName + " does not exist");
                fetch(url)
                    .then((res) => {
                        return res.text();
                    })
                    .then((data) => {
                        parsePodcast(data, (err, data) => {
                            if (err) {
                                console.error('Parsing error', err);
                                return;
                            }
                            redisClient.set(showName,JSON.stringify(data), (err, reply) => {
                                if(!err) {
                                    if(reply) {
                                        console.log("Redis updated with: " + showName);
                                    } else {
                                        console.log("Failed to set key");
                                    }
                                } else {
                                    console.log(err);
                                }
                            });
                            //Set data expiry time to six hours
                            redisClient.expire(showName, 21600);
                            res.json(data);
                        });
                }).catch((err) => {
                    if(err) {
                        console.log("Unable to reach url");
                        res.json(err);
                    }
                });
            }
        }
    });


});

app.get('/api/home', (req, res) => {

    logger.info("Received request: /api/home");

    let aggregateEpisodeList = [];

    let promiseArr = showList.map((showName) => {
        logger.debug(showName);
            return redisClient.getAsync(showName)
                        .then((reply) => {
                            logger.debug("Got data for " + showName + "from Redis");
                            let rssjson = JSON.parse(reply);
                            Object.keys(rssjson.episodes).map((key) => {
                                rssjson.episodes[key]["showName"] = showName;
                                aggregateEpisodeList.push(rssjson.episodes[key]);
                            });
                        })
                        .catch((err) => {
                            logger.error(err);
                        });
    });

    Promise.all(promiseArr)
        .then(() => {
            logger.trace("All promises have resolved");
            //Sort in decending order
            aggregateEpisodeList.sort((a, b) => {
                return (a.published > b.published) ? -1 : ((a.published < b.published) ? 1 : 0);
            });

            logger.debug("Total number of episodes: " + aggregateEpisodeList.length.toString(10));
            res.json(aggregateEpisodeList.slice(0, 30));
        })
        .catch((err) => {
            logger.error(err);
        });

    
    

});

app.listen(port, () => console.log(`Listening on port ${port}`));