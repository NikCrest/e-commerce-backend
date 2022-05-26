const express = require("express");

const User = require("../app/schemas/user");
const adminController = require("../app/controllers/admin");

const router = new express.Router();
router.get("/merchant-list", adminController.getMerchantsList);
router.get("/block/:id", adminController.blockMerchants);
router.get("/unblock/:id", adminController.unblockMerchants);
router.post("/add-category", adminController.addCategoryHandler);
module.exports = router;
