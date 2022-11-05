const moment = require('moment');

// As middleware function we need the next parameter which is a callback function to the next middleware function
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;