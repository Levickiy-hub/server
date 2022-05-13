'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport/passport');

const routes = require('./routes/index');
const users = require('./routes/users');
const teacher = require('./routes/teacher');
const student = require('./routes/student');
const admin = require('./routes/admin');
const db = require("./db/db");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "asdasd", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
initializePassport(passport);

app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/teacher', teacher);
app.use('/api/student', student);
app.use('/api/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.set('port', process.env.PORT || 3001)


const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
