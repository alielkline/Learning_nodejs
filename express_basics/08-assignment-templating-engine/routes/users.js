const path = require('path');

const express = require('express');
const router = express.Router();
const homeData = require('./home');

router.get('/users', (req, res, next) => {
    res.render('users', {pageTitle: 'Users', names: homeData.users, path: '/users'});
})

exports.routes = router;