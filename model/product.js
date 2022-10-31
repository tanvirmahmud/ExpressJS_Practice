const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(item) {
    this.item = item;
  }

  save() {
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

  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (fileContent.length === 0) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
