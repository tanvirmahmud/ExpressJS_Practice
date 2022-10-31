const express = require("express");
const productControler = require("../controlers/products");

const router = express.Router();

// Rendering for / page
router.get("/", productControler.getProducts);

module.exports = router;
