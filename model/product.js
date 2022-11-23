const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    if (this.id) {
      let existingProductIndex, products;
      fs.readFile(p, (err, fileContent) => {
        products = JSON.parse(fileContent);
        existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
          console.log(error);
        });
      });
    } else {
      this.id = Math.random().toString();
      fs.readFile(p, (err, fileContent) => {
        let products = [];

        if (fileContent.length === 0) {
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), (err) => {
            console.log(err);
          });
          return;
        }

        if (!err) {
          products = JSON.parse(fileContent);
        }

        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      });
    }
  }
  static delete(id) {
    fs.readFile(p, (err, fileContent) => {
      const product = JSON.parse(fileContent).find((prod) => prod.id === id);
      const updatedProducts = JSON.parse(fileContent).filter(
        (p) => p.id !== id
      );
      fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
        if (!error) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (fileContent.length === 0) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }

  static findById(id, cb) {
    fs.readFile(p, (err, fileContent) => {
      // if (fileContent.length === 0) {
      //   return cb(null);
      // }
      const product = JSON.parse(fileContent).find((p) => p.id === id);
      cb(product);
    });
  }
};
