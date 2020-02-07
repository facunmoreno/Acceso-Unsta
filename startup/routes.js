// Routes
const home = require('../routes/home');
const qr_access = require('../routes/qr-access');
const patentes = require('../routes/patentes');
const vehicle_access = require('../routes/vehicle-access');
const users = require('../routes/users');
const admin = require('../routes/admin');

// Middlewares
const admin_mid = require('../middleware/admin');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use('/api', home);
    app.use('/api/qr', qr_access);
    app.use('/api/patentes', patentes);
    app.use('/api/vehicle_access', vehicle_access);
    app.use('/api/users', users);
    app.use('/api/admin', [admin_mid], admin);

    app.use(error);
};