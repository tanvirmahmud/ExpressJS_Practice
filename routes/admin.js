const express = require("express");
const adminControler = require("../controlers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminControler.getAddProduct);

// /admin/products => GET
router.get("/products", adminControler.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminControler.postAddProducts);

router.get("/edit-product/:productId", adminControler.getEditProduct);
router.post("/edit-product", adminControler.postEditProduct);
router.post("/delete-product", adminControler.postDeleteProduct);

module.exports = router;
