require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

var rtsIndex = require('./routes/index.router');
var customerController = require('./controllers/customerController.js');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/customers', customerController);
//
app.listen(process.env.PORT, () => {
  console.log(`Server connected at port: ${process.env.PORT}`);
});
