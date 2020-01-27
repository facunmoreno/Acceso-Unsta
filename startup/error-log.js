const winston = require('winston');
require('winston-mongodb');

const winston_mongo = new winston.transports.MongoDB({
    db: 'mongodb://localhost/Acceso-Unsta',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    level: 'error'
});

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: './error-logging/errors.log', level: 'error' }),
        new winston.transports.File({ filename: './error-logging/combined.log', level: 'info' }),
        winston_mongo
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './error-logging/uncaughtExceptions.log', level: 'error' }),
        winston_mongo
    ]
});


module.exports = function() {    
    process.on('unhandledRejection', (err) => {
        console.log(err);
        logger.error(err.message, err);
    });
    
    process.on('uncaughtException', (err) => {
        console.log(err);
    });
};

module.exports.logger = logger;