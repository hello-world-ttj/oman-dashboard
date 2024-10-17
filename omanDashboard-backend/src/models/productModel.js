const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      en: { type: String },
      ar: { type: String },
    },
    description: {
      en: { type: String },
      ar: { type: String },
    },
    image: { type: String },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
