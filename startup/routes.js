// Routes
const home = require('../routes/home');
const qr_access = require('../routes/qr-access');

// Middlewares
const error = require('../middleware/error');

module.exports = function(app) {
    app.use('/api', home);
    app.use('/api', qr_access);
    
    app.use(error);
};