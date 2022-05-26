const express = require("express");
const merchantController = require("../app/controllers/merchants");

const router = new express.Router();
router.post("/add-product", merchantController.addProduct);
router.get("/categories", merchantController.listCategory);
router.get("/products", merchantController.getMerchantWiseProducts);
router.get("/get-order-list", merchantController.getOrderList);
router.post("/validate-order", merchantController.validateUser);
module.exports = router;
