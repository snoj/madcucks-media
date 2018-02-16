const fetch = require('node-fetch');
const parsePodcast = require('node-podcast-parser');
const sanitizer = require('sanitizer');

const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'ALL';

const redis = require('redis');
const redisClient = redis.createClient({host : process.env.REDIS_URL || process.env.REDIS_HOST || 'localhost'});
redisClient.on('ready',function() {
    logger.info("Redis is ready");
});

redisClient.on('error',function() {
    logger.error("Error in Redis");
});

const showList = ["thedickshow","thatlarryshow","lawsplaining","hwidg","sciencefriction","realnerdhours","biggestproblem"];


var rssRefresher = (showName) => {
    logger.info("Running process for " + showName);
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
    }

       
    fetch(url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            parsePodcast(data, (err, data) => {
                if (err) {
                    logger.error('Parsing error', err);
        
                }

                const numberOfEpisodes = data.episodes.length;
                let tempEpisodeList = {};

                data.episodes.map((episode) => {
                    //Santize description. Didn't want to get rid of html and embedded elements entirely.
                    episode.description = sanitizer.sanitize(episode.description);
                    //Using GUID as hash to easily pull up episode information.
                    tempEpisodeList[encodeURIComponent(episode.guid)] = episode;
                });

                // console.log(tempEpisodeList);

                data.episodes = tempEpisodeList;
                data.showName = showName;

                redisClient.set(showName,JSON.stringify(data), (err, reply) => {
                    if(!err) {
                        if(reply) {
                            logger.info("Redis updated with: " + showName);
                        } else {
                            logger.error("Failed to set key: " + showName);
                        }
                    } else {
                        logger.error(err);
            
                    }
                });
            });
    }).catch((err) => {
        if(err) {
            logger.error("Unable to reach url");

        }
    });

}

showList.map((a) => {
    rssRefresher(a);
});

showList.map((a) => {
    setInterval(() => {rssRefresher(a)}, 3600000);
});



