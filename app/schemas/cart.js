const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
cartSchema.virtual("product-details", {
  ref: "product",
  localField: "productId",
  foreignField: "_id",
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
