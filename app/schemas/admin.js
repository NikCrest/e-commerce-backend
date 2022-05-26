const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema(
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
      //   required: true,
    },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

// userSchema.virtual("orders", {
//   ref: "Order",
//   localField: "_id",
//   foreignField: "orderBy",
// });

// userSchema.virtual("menus", {
//   ref: "Menu",
//   localField: "_id",
//   foreignField: "owner",
// });

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
