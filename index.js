const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();


const port = process.env.PORT || 3000;
const server = app.listen(port);

module.exports = server