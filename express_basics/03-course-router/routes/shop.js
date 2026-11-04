const express = require('express');
const path = require('path');

const router = express.Router();

// 'get' does an exact match on the path unlike 'use' which allows any path starting with / which is basically all of them.
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;