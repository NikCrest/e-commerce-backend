const { ObjectId } = require("mongodb");
const httpError = require("../../models/http-error");
const Merchant = require("../schemas/merchants");
const Category = require("../schemas/category");

const getMerchantsList = async (req, res, next) => {
  try {
    const merchants = await Merchant.find({ role: "merchant" }).select([
      "email",
      "username",
      "blocked",
    ]);
    res.send({ status: true, message: "merchant list", data: merchants });
  } catch (e) {
    return next(new httpError("Something went wrong!", 500));
  }
};
const blockMerchants = async (req, res, next) => {
  try {
    if (req.role === "admin") {
      const id = req.params.id;
      const merchant = await Merchant.findById(id);
      console.log(merchant);
      if (!merchant) {
        return next(new httpError("Merchant not found!", 404));
      }
      merchant.blocked = true;
      await merchant.save();
      res.send({ status: true, message: "Merchant blocked." });
    } else {
      return next(new httpError("This is not admin account", 500));
    }
  } catch (e) {
    return next(new httpError(e.message, 500));
  }
};
const unblockMerchants = async (req, res, next) => {
  try {
    if (req.role === "admin") {
      const id = req.params.id;
      const merchant = await Merchant.findById(id);
      console.log(merchant);
      if (!merchant) {
        return next(new httpError("Merchant not found!", 404));
      }
      merchant.blocked = false;
      await merchant.save();
      res.send({ status: true, message: "Merchant unblocked." });
    } else {
      return next(new httpError("This is not admin account", 500));
    }
  } catch (e) {
    return next(new httpError(e.message, 500));
  }
};
const addCategoryHandler = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.send({ status: true, message: "Category added successfully." });
  } catch (e) {
    return next(new httpError(e, 500));
  }
};
module.exports = {
  getMerchantsList,
  blockMerchants,
  unblockMerchants,
  addCategoryHandler,
};
