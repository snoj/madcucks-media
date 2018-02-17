const schedule = require('node-schedule');
const rssRefresh = require('./rssRefresh');

const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'ALL';

logger.info("Setting up background processer");

const main  = schedule.scheduleJob('*/15 * * * *', () => {
    logger.info("Executing scheduled background process");
    rssRefresh().then(() => {
        logger.info("Successful completion of background process!")
    });
});

rssRefresh().then(() => {
    logger.info("Successful completion of background process!")
});

