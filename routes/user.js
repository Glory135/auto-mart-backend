const router = require("express").Router();
const Product = require("../modals/Product");
const { cloudinary } = require("../cloudinary");

// Post product
// POST /api/user/post
// public
router.post("/user/post", async (req, res) => {
  const { img1, img2, img3 } = req.body;
  const image = async (img) => {
    const uploadedResponse = await cloudinary.uploader.upload(img, {
      upload_preset: "ml_default",
    });
    return uploadedResponse.url;
  };

  try {
    const product = await Product.create({
      ...req.body,
      images: {
        main: image(img1),
        extra1: image(img2),
        extra2: image(img3),
      },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
