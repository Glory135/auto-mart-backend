const router = require("express").Router();
const Product = require("../modals/Product");
const { cloudinary } = require("../cloudinary");

// get all product
// GET /api/products
// public
router.get("/products", async (req, res) => {
  try {
    const all = await Product.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
