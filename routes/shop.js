const express = require("express");
const shopControler = require("../controlers/shop");

const router = express.Router();

// Rendering for / page
router.get("/", shopControler.getIndex);
router.get("/products", shopControler.getProducts);
router.get("/products/:productId", shopControler.getProduct);
router.get("/cart", shopControler.getCart);
router.post("/cart", shopControler.postCart);
router.post("/cart-delete-item", shopControler.postCartDeleteProduct);
router.get("/orders", shopControler.getOrders);
router.get("/checkout", shopControler.getCheckout);

module.exports = router;
