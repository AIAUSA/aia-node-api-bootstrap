const express = require('express');
const app = express();

var sendEmail = require('./email');

app.use('/email', sendEmail);

module.exports = app;
