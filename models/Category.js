const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    img: { type: String },
    title: { type: String, required: true, unique: true },
    cat: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
