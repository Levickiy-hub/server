'use strict';
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('../db/db');
const bcrypt = require("bcrypt");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send('api work');
});

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { res.status(401); return res.send({message:'noAutorized'}) }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            if (bcrypt.compareSync('1234', user.password)) {
                res.send({user,message:'updatePassword'})
            } else {
                return  res.send(user);
            }

        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/updatepassword', function (req, res) {
    const sessions = req.session;
    if (sessions.passport.user.role === 'teacher' ||
        sessions.passport.user.role === 'student' ||
        sessions.passport.user.role === 'admin') {
        const { password, password2 } = req.body;
        console.log(password[0]===password2[0]);
        if (password[0] === password2[0]) {
            db.UpdatePassword(sessions.passport.user.id, password[0]);
            res.send({ message: 'ok' ,role:sessions.passport.user.role});
        }
        else {
            res.send({ message: 'Passwords do not match' });
        }
    }
    else {
        res.redirect('/');
    }
});
module.exports = router;
