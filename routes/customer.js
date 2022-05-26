const express = require("express");
const customerController = require("../app/controllers/customer");

const router = new express.Router();
router.post("/add-to-cart", customerController.addToCart);
router.get("/cart", customerController.getCartProducts);
router.delete("/cart/:id", customerController.deleteCartItems);
router.delete("/clearcart", customerController.clearCart);
router.post("/order", customerController.addOrder);
router.get("/orderlist", customerController.getOrderList);
module.exports = router;
