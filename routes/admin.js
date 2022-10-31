const express = require("express");
const productControler = require("../controlers/products");

const router = express.Router();

router.get("/add-product", productControler.getAddProduct);

router.post("/add-product", productControler.postAddProducts);

module.exports = router;
