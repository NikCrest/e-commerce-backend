const httpError = require("../../models/http-error");
const Category = require("../schemas/category");
const Product = require("../schemas/product");
const Merchants = require("../schemas/merchants");
const Order = require("../schemas/order");

const addProduct = async (req, res, next) => {
  let product;
  try {
    if (req.role === "merchant") {
      const merchant = await Merchants.findById(req.id).select("blocked");
      if (!merchant.blocked) {
        product = new Product({ ...req.body, merchantId: req.id });
        await product.save();
      } else {
        return next(new httpError("You are blocked by admin.", 500));
      }

      res.send({
        status: true,
        message: "Product added successfully!",
        data: product,
      });
    } else {
      return next(new httpError("Not merchant account.", 404));
    }
  } catch (e) {
    return next(new httpError(e.message, 500));
  }
};
const listCategory = async (req, res, next) => {
  let categories;
  try {
    const gender = req.query.gender;
    if (gender === "male") {
      categories = await Category.find({ gender: "male" });
    } else if (gender === "female") {
      categories = await Category.find({ gender: "female" });
    } else {
      categories = await Category.find();
    }

    res.send({ status: true, message: "Category list", categories });
  } catch (e) {
    return next(new httpError(e.message, 500));
  }
};
const getMerchantWiseProducts = async (req, res, next) => {
  try {
    const products = await Merchants.findById(req.id)
      .select(["username", "email", "blocked"])
      .populate({
        path: "products",
      });
    res.send({ status: true, message: "Products of merchant", products });
  } catch (e) {
    return next(new httpError("Something wrong happened", 500));
  }
};
const getOrderList = async (req, res, next) => {
  try {
    const orders = await Merchants.findById(req.id)
      .select("username")
      .populate({
        path: "orders",
        populate: {
          path: "product-details",
        },
      });
    res.send({ status: true, message: "Order list.", data: orders });
  } catch (e) {
    return next(new httpError("Something wrong happened!", 500));
  }
};
const validateUser = async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.id);
    order.message = req.body.message;
    order.approved = req.body.approved;
    await order.save();
    res.send({ status: true, message: "Order validated." });
  } catch (e) {
    return next(new httpError("Something wrong happened!", 500));
  }
};
module.exports = {
  addProduct,
  listCategory,
  getMerchantWiseProducts,
  getOrderList,
  validateUser,
};
