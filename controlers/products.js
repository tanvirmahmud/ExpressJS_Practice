const Product = require("../model/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Product",
    path: "/admin/add-product",
    mainCSS: true,
    productCSS: true,
    activeProduct: true,
  });
};

exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      hasProduct: products.length > 0,
      mainCSS: true,
      activeShop: true,
    });
  });
};
