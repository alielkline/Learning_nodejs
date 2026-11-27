const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// router.get('/products/delete'); // The order of the routes matter here since this is a fixed route not a dynamic one like the next route so if the order was reversed the dynamic route will be fired even if the route is /products/delete

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/add-to-cart', shopController.addToCart);

router.post('/delete-from-cart', shopController.deleteFromCart)

module.exports = router;
