const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const merchantSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is invalid");
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password should be at least 6 characters"],
    },
    token: {
      type: String,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

merchantSchema.virtual("products", {
  ref: "product",
  localField: "_id",
  foreignField: "merchantId",
});
merchantSchema.virtual("orders", {
  ref: "order",
  localField: "_id",
  foreignField: "merchantId",
});
const Merchant = mongoose.model("merchant", merchantSchema);

module.exports = Merchant;
