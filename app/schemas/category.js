const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
categorySchema.virtual("products", {
  ref: "product",
  localField: "_id",
  foreignField: "categoryId",
});
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
