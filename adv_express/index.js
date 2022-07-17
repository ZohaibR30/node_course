const config = require('config');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger.js')
const helmet = require('helmet');
const morgan = require('morgan');
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();
// CONFIGURATION
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
console.log('Mail Server Password: ' + config.get('mail.password')); //set app_password=1234


if (app.get('env') === 'development'){ //set NODE_ENV=develpment
    app.use(morgan('tiny'));
    startUpDebugger('Morgan Enabled...'); //set DEBUG=app:startup
}

// Db work...
dbDebugger('Connected to DB...'); //set DEBUG=app:startup,app:db or app:* (FOR ALL MSGS)

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use (logger);

app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;  //set PORT=5000

app.listen(port, () => console.log(`Listening on PORT ${port}`));