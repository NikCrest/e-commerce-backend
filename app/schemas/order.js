const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "merchant",
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    approved: {
      type: Boolean,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
orderSchema.virtual("product-details", {
  ref: "product",
  localField: "productId",
  foreignField: "_id",
});
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
