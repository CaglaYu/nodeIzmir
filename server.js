//require('./config/config')
const env = process.env.NODE_ENV || 'development';
require('dotenv').config();
require('rootpath')();
require('./jwt/passportConfig');


const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const passport = require('passport');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(passport.initialize());
// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server

app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT));