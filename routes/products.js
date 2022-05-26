const express = require("express");
const productController = require("../app/controllers/products");

const router = new express.Router();
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductsByCategory);
module.exports = router;
