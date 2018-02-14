const fetch = require('node-fetch');
const Queue = require('bull');
const parsePodcast = require('node-podcast-parser');
const sanitizer = require('sanitizer');

const log4js = require('log4js');

var logger = log4js.getLogger();

logger.level = 'ALL';

const redis = require('redis');

const rssQueue = new Queue('rss refresher', 'redis://127.0.0.1:6379');
const showList = ["thedickshow","thatlarryshow","lawsplaining","hwidg","sciencefriction","realnerdhours","biggestproblem"];

const redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
});

rssQueue.process((job, done) => {
    console.log("Running process");
    let url = '';
    let showName = job.data.showName;
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
                return;
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
                            done();
                        });
                }).catch((err) => {
                    if(err) {
                        console.log("Unable to reach url");
                        done(new Error(err));
                    }
                });
            }
        }
    });


});

showList.map((showName) => {
    rssQueue.add({showName: showName});
});

