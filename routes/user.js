const router = require("express").Router();
const Product = require("../modals/Product");
const { cloudinary } = require("../cloudinary");

// get single product
// GET /api/product/:id
// public
router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
