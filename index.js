const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const categoryRoute = require("./routes/category");
const sliderRoute = require("./routes/slider");
const aboutUsRoute = require("./routes/aboutUs");
// const functions = require("firebase-functions");
const cors = require("cors");

// const bodyParser = require("express").json;
// app.use(bodyParser())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/sliders", sliderRoute);
app.use("/api/aboutUs", aboutUsRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

// exports.api = functions.https.onRequest(app)
