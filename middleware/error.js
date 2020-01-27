const { logger } = require('../startup/error-log');

module.exports = async function(err, req, res, next){
    if(err){
        res.status(500).send(`Internal server error: ${err.message}`);
        console.log(err);
        logger.error(err.message, err);
    }
    next();
}