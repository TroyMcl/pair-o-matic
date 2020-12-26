const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', router);

module.exports = app;



