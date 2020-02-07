const express = require('express');
const app = express();
require('express-async-errors');


require('./startup/jwt-verification')();
require('./startup/db')();
require('./startup/error-log')();
require('./startup/validation')();
app.use(express.json());
require('./startup/production')(app);
require('./startup/routes')(app);
require('./startup/admin-seeder')();

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));