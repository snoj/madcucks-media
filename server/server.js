const express = require('express');
const Promise = require('bluebird');
const fetch = require('node-fetch');
const parsePodcast = require('node-podcast-parser');
const redis = require('redis');
const path = require('path');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);


const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'ALL';

const redisHost = process.env.REDIS_URL || process.env.REDIS_HOST || '127.0.0.1';
const redisClient = redis.createClient({
    host: redisHost
});

logger.debug(redisHost);

const app = express();
const port = process.env.PORT || 5000;

const podcasts = require('./config/podcasts.json');
const showList = Object.keys(podcasts);

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/api/shows/', (req, res) => {

    logger.info("Received request: /api/shows");

    redisClient.exists('api-shows', (err, reply) => {
        if(!err) {
            if(reply) {
                redisClient.get('api-shows', (err, reply) => {
                    if(!err) {
                        logger.info('api-shows found in redis cache');
                        res.json(JSON.parse(reply));
                    }
                });
            } else {
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
                        redisClient.set('api-shows', JSON.stringify(aggregateShowInfo), (err, reply) => {
                            if(!err) {
                                if(reply) {
                                    logger.info("Redis updated with: api-shows");
                                } else {
                                    logger.error("Failed to set key: api-shows");
                                }
                            } else {
                                logger.error(err);
                            }
                        });
                        //Set data expiry time to an hour
                        redisClient.expire('api-shows', 3600);
                        res.json(aggregateShowInfo);
                    })
                    .catch((err) => {
                        logger.error(err);
                    });
            }
            
        }
    });

    
});

app.get('/api/shows/:showName', (req, res) => {

    const showName = req.params.showName;

    redisClient.exists(showName, (err, reply) => {
        if(!err) {
            if(reply) {
                console.log('Key: ' + showName + ' exists');
                redisClient.get(showName, (err, reply) => {
                    if(!err) {
                        res.json(JSON.parse(reply));
                    }
                });
            }
        }
    });

});

app.get('/api/home', (req, res) => {

    logger.info("Received request: /api/home");

    redisClient.exists('api-home', (err, reply) => {
        if(!err) {
            if(reply) {
                redisClient.get('api-home', (err, reply) => {
                    if(!err) {
                        logger.info('api-home found in redis cache');
                        res.json(JSON.parse(reply));
                    }
                });
            } else {
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

                        redisClient.set('api-home', JSON.stringify(aggregateEpisodeList.slice(0, 30)), (err, reply) => {
                            if(!err) {
                                if(reply) {
                                    logger.info("Redis updated with: api-home");
                                } else {
                                    logger.error("Failed to set key: api-home");
                                }
                            } else {
                                logger.error(err);
                            }
                        });
                        //Every 10 mins expires
                        redisClient.expire('api-home', 600);
                        res.json(aggregateEpisodeList.slice(0, 30));
                    })
                    .catch((err) => {
                        logger.error(err);
                    });

            }
        }
    });

});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));