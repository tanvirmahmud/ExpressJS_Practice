const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const products = [];
const router = express.Router();
// router.get("/add-product", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
// });
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    docTitle: "Product",
    path: "/admin/add-product",
    mainCSS: true,
    productCSS: true,
    activeProduct: true,
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
