const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

// Rendering for / page
router.get("/", (req, res, next) => {
  res.render("shop", {
    prods: adminData.products,
    docTitle: "Shop",
    path: "/",
    hasProduct: adminData.products.length > 0,
  });
});

module.exports = router;
