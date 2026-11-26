const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    docTitle: 'Add Products', 
    path: '/admin/add-product',
  })
};

exports.postAddProduct = (req, res, next) => {
  const prod = new Product(req.body.title);
  prod.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop', {
        prods: products, 
        docTitle: 'Shop', 
        path: '/'
      });
  });

};
