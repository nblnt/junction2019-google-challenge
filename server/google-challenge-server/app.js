const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const queryRouter = require('./routes/query');
const searchRouter = require('./routes/search');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));
app.use('/query', queryRouter);
app.use('/search', searchRouter);

const port = process.env.port || 4000;
app.listen(port);
console.log(`Google Animal Tracking server listening on port: ${port}`);

