const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const router = express.Router();

// /admin/add_product => GET
router.get('/add_product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add_product => POST
router.post('/add_product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;