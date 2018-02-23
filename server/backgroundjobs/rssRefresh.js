const Promise = require('bluebird');
const fetch = require('node-fetch');
const parsePodcast = Promise.promisify(require('node-podcast-parser'));
const sanitizer = require('sanitizer');

const podcasts = require('../config/podcasts.json');

const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'ALL';

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL || process.env.REDIS_HOST || 'redis://localhost');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

redisClient.on('ready',function() {
    logger.info("Redis is ready");
});

redisClient.on('error',function() {
    logger.error("Error in Redis");
});

const refreshPodcastFeed = (showName) => {
    logger.info("Running process for " + showName);
    let url = podcasts[showName];
    logger.debug(url);

    return fetch(url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            return parsePodcast(data);
        }).then((data) => {
            const numberOfEpisodes = data.episodes.length;
            let tempEpisodeList = {};

            data.episodes.map((episode) => {
                //Santize description. Didn't want to get rid of html and embedded elements entirely.
                episode.description = sanitizer.sanitize(episode.description);
                //Using GUID as hash to easily pull up episode information.
                tempEpisodeList[encodeURIComponent(episode.guid)] = episode;
            });

            data.episodes = tempEpisodeList;
            data.showName = showName;

            return redisClient.setAsync(showName,JSON.stringify(data));

        }).then((reply) => {
            if(reply) {
                logger.info("Redis updated with: " + showName);
            } else {
                logger.error("Failed to set key: " + showName);
            }
        }).catch((err) => {
            logger.error(err);
        });

}

const rssRefresh = () => {

    let promiseArray = [];

    Object.keys(podcasts).map((key) => {
        promiseArray.push(refreshPodcastFeed(key));
    });

    return Promise.all(promiseArray);

};

module.exports = rssRefresh;





