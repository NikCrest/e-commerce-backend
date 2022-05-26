const HttpError = require("../../models/http-error");
const Cart = require("../schemas/cart");
const User = require("../schemas/user");
const Product = require("../schemas/product");
const Order = require("../schemas/order");

const addToCart = async (req, res, next) => {
  try {
    const cartItem = new Cart({ ...req.body, customerId: req.id });
    await cartItem.save();
    res.send({ status: true, message: "Cart item added", cartItem });
  } catch (e) {
    return next(new HttpError("Something wrong happened!", 500));
  }
};
const getCartProducts = async (req, res, next) => {
  try {
    const products = await Cart.find({ customerId: req.id }).populate(
      "product-details"
    );
    res.send({
      status: true,
      message: "Cart item of user",
      cartItems: products,
    });
  } catch (e) {
    return next(new HttpError(e.message, 500));
  }
};
const deleteCartItems = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.send({ status: true, message: "Cart item deleted!" });
  } catch (e) {
    return next(new HttpError("Something wrong happened!", 500));
  }
};
const addOrder = async (req, res, next) => {
  try {
    req.body.id.map(async (item) => {
      const data = await Cart.findById(item);
      const orderData = new Order({
        productId: data.productId,
        customerId: data.customerId,
        merchantId: data.merchantId,
        quantity: data.quantity,
        total: data.total,
      });
      await orderData.save();
    });
    res.send({ status: true, message: "Order placed." });
  } catch (e) {
    return next(new HttpError("Soemthing wrong happened!", 500));
  }
};
const clearCart = async (req, res, next) => {
  try {
    req.body.id.map(async (item) => {
      await Cart.findByIdAndDelete(item);
    });
    res.send({ status: true, message: "Cart cleared" });
  } catch (e) {
    return next(new HttpError("Soemthing wrong happened!", 500));
  }
};
const getOrderList = async (req, res, next) => {
  try {
    const products = await Order.find({ customerId: req.id }).populate(
      "product-details"
    );
    res.send({
      status: true,
      message: "Cart item of user",
      orderItems: products,
    });
  } catch (e) {
    return next(new HttpError("Soemthing wrong happened!", 500));
  }
};
module.exports = {
  addToCart,
  getCartProducts,
  deleteCartItems,
  addOrder,
  getOrderList,
  clearCart,
};
