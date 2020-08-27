const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users');
const questions = require('../routes/questions');
const comments = require('../routes/comments');

module.exports = function (app) {

    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/questions', questions)
    app.use('/api/comments', comments)
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });
}