const rootDir = require('../util/path');
const fs = require('fs').promises;
const path = require('path');

const p = path.join(rootDir, 'data', 'products.json');

const Cart = require('./cart');

async function getAllProducts() {
    try {
        const fileContent = await fs.readFile(p, 'utf8');
        if (!fileContent.trim()) {
            return [];
        }
        return JSON.parse(fileContent);
    } catch (err) {
        if (err.code === 'ENOENT') { // if the error is that the 'no such file or directory'
            return [];
        }
        throw err;
    }
}

module.exports = class Product {
    constructor (id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {
        const products = await getAllProducts();

        if (this.id) {
            const productIndex = products.findIndex(prod => prod.id === this.id);
            products[productIndex] = this;
        }else {
            this.id = Date.now().toString();
            products.push(this);
        }
        
        await fs.writeFile(p, JSON.stringify(products));
    }

    static fetchAll() {
        return getAllProducts();
    }

    static async findById(id) {
      const products = await getAllProducts();
      const prod = products.find(p => p.id === id)
      return prod;
    }

    static async delete(id) {
        const products = await getAllProducts();
        const productIndex = products.findIndex(prod => prod.id === id);

        if (productIndex === -1) {
            return;
        }

        const product = products.find(prod => prod.id === id);
        await Cart.deleteProduct(id, product.price);
        products.splice(productIndex, 1);
        await fs.writeFile(p, JSON.stringify(products));
    }
}

