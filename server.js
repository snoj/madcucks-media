const express = require('express');
const fetch = require('node-fetch');
const parsePodcast = require('node-podcast-parser');
const redis = require('redis');

const redisClient = redis.createClient({host : 'localhost', port : 6379});

const app = express();
const port = process.env.PORT || 5000;

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
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

app.get('/api/shows/:show/:id', (req, res) => {

});

app.listen(port, () => console.log(`Listening on port ${port}`));