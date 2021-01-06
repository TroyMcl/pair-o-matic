const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const cookieParser = require('cookie-parser');
const { verify } = require('./auth');

app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/pairs', express.static('public'));
app.use('/login', express.static('public'));
app.use('/signup', express.static('public'));
app.use('/create', express.static('public'));


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/auth', router)
// app.use('/api', verify, router);
app.use('/api', router);

module.exports = app;



