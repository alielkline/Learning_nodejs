const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const productControllers = require('../controllers/products');

// /admin/add-product => GET
router.get('/add-product', productControllers.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productControllers.postAddProduct);

exports.routes = router;
