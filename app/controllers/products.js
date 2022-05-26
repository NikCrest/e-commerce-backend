const Product = require("../schemas/product");
const httpError = require("../../models/http-error");
const Category = require("../schemas/category");

const getProducts = async (req, res, next) => {
  let products;
  try {
    if (req.query.categoryWise) {
      products = await Category.find().populate("products");
      res.send({
        status: true,
        message: "Product List",
        categoryWiseProducts: products,
      });
    } else {
      products = await Product.find();
      res.send({ status: true, message: "Product List", products });
    }
  } catch (e) {
    return next(new httpError("Something wrong happened", 500));
  }
};
const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ categoryId: req.params.id });
    res.send({
      status: true,
      message: "Product list",
      categoryId: req.params.id,
      products,
    });
  } catch (e) {
    return next(new httpError("Something wrong happened!", 500));
  }
};
module.exports = { getProducts, getProductsByCategory };
