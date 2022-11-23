const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct = (id, productPrice) => {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increse quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  };
  static deleteProduct(productId, productPrice) {
    fs.readFile(p, (error, fileContent) => {
      if (error) {
        return;
      }

      const updateCart = { ...JSON.parse(fileContent) };
      const product = updateCart.products.find((prod) => prod.id === productId);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updateCart.products = updateCart.products.filter(
        (prod) => prod.id !== productId
      );

      updateCart.totalPrice = Math.round(
        updateCart.totalPrice - productPrice * productQty
      );

      fs.writeFile(p, JSON.stringify(updateCart), (error) => {
        console.log(error);
      });
    });
  }
  static getCart(cb) {
    fs.readFile(p, (error, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (error) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
