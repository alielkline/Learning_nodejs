const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId; // productId is defined in the shop.js routes
  const product = await Product.findById(prodId);
  res.render('shop/product-detail', {
    prod: product,
    pageTitle: 'Product',
    path: '/products'
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCartProducts();
  let prods = await Product.fetchAll();
  const cartProducts = [];
  for(let product of prods) {
    const productIndex = cart.products.findIndex(prod => prod.id === product.id);
    if(productIndex !== -1) {
      product.qty = cart.products[productIndex].qty;
      cartProducts.push(product);
    }
  }
  cartProducts.totalPrice = cart.totalPrice;
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: cartProducts
  });
};

exports.addToCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  Cart.addProduct(prodId, product.price);
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.deleteFromCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  Cart.deleteProduct(prodId, product.price);
  res.redirect('/cart');
};