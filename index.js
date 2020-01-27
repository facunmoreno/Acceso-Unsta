const express = require('express');
const app = express();
require('express-async-errors');

require('./startup/db')();
require('./startup/error-log')();
require('./startup/validation')();
require('./startup/production')(app);
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));