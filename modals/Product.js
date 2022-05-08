const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      //   required: true,
    },
    year: {
      type: Number,
      //   required: true,
    },
    color: {
      type: String,
      //   required: true,
    },
    mileage: {
      type: Number,
      //   required: true,
    },
    price: {
      type: Number,
      //   required: true,
    },
    images: {
      type: Object,
      //   required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
