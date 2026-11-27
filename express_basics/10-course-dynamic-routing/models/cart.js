const path = require('path');

const rootDir = require('../util/path');

const fs = require('fs').promises;

const p = path.join(rootDir, 'data', 'cart.json');


module.exports = class Cart {
  static async addProduct(prodId, prodPrice) {
    let cart = { products: [], totalPrice: 0 };

    try {
      const fileContent = await fs.readFile(p, 'utf8');
      cart = JSON.parse(fileContent);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    const existingProductIndex = cart.products.findIndex(prod => prod.id === prodId);
    const existingProduct = cart.products[existingProductIndex];

    if (existingProduct) {
      const updatedProduct = { ...existingProduct };
      updatedProduct.qty += 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      cart.products = [...cart.products, { id: prodId, qty: 1 }];
    }

    cart.totalPrice = cart.totalPrice + +prodPrice;

    await fs.writeFile(p, JSON.stringify(cart));
  }

  static async deleteProduct(prodId, prodPrice) {
    let cart = {products: [], totalPrice: 0};

    try {
      const fileContent = await fs.readFile(p, 'utf8');
      cart = JSON.parse(fileContent);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    const updatedCart = {...cart};
    const product = updatedCart.products.find(prod => prod.id === prodId);

    if (!product) {
      return;
    }

    updatedCart.totalPrice -= +prodPrice * product.qty;

    updatedCart.products = updatedCart.products.filter(prod => prod.id !== prodId);

    await fs.writeFile(p, JSON.stringify(updatedCart));
  }

  static async getCartProducts() {
    let cart = { products: [], totalPrice: 0 };

    try {
      const fileContent = await fs.readFile(p, 'utf8');
      cart = JSON.parse(fileContent);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    return cart;
  };
};