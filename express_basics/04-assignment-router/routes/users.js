const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const router = express.Router();

router.post('/users', (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

router.get('/users', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

module.exports = router;