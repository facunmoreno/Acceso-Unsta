const config = require('config');

module.exports = function(){    
    if(config.get('jwtPrivateKey') == ""){
        throw new Error('FATAL ERROR: JWT Private Key required');
        process.exit(1);
    }
}