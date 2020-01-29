// Routes
const home = require('../routes/home');
const qr_access = require('../routes/qr-access');
const patentes = require('../routes/patentes');

// Middlewares
const error = require('../middleware/error');

module.exports = function(app) {
    app.use('/api', home);
    app.use('/api/qr', qr_access);
    app.use('/api/patentes', patentes);

    app.use(error);
};