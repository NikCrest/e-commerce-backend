const express = require("express");
const cors = require("cors");

const HttpError = require("./models/http-error");
const db = require("./database/db");
const users = require("./routes/user");
const auth = require("./app/middlewares/auth");
const admin = require("./routes/admin");
const merchants = require("./routes/merchants");
const products = require("./routes/products");
const customer = require("./routes/customer");

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
app.use("/user", users);
app.use(auth);
app.use("/admin", admin);
app.use("/merchants", merchants);
app.use("/products", products);
app.use("/customer", customer);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    status: false,
    message: error.message || "An unknown error occurred!",
    error: [],
  });
});

app.listen(5000, () => {
  console.log("connected");
});
