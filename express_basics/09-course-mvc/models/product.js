const rootDir = require('../util/path');
const fs = require('fs');
const path = require('path');

const p = path.join(rootDir, 'data', 'products.json')

async function getAllProducts () {
    return new Promise((resolve, reject) => {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return resolve([]);
            }

            resolve(JSON.parse(fileContent));
        })
    });
}

module.exports = class Product {
    constructor (t) {
        this.title = t;
    }

    save() {

        getAllProducts().then(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll() {
        return getAllProducts();
    }
}