const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "Describe in atlest 10 character"],
    },
    price: {
      type: Number,
      required: true,
    },
    offers: {
      type: Object,
    },
    specification: {
      type: Object,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "merchant",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.virtual("products", {
  ref: "cart",
  localField: "_id",
  foreignField: "productId",
});
const Product = mongoose.model("product", productSchema);

module.exports = Product;
