const router = require("express").Router();
const Product = require("../modals/Product");
const { cloudinary } = require("../cloudinary");

// Post product
// POST /api/user/post
// public
router.post("/user/post", async (req, res) => {
  const { brand, img1, img2, img3 } = req.body;
  const image = async (img) => {
    const uploadedResponse = await cloudinary.uploader.upload(img, {
      upload_preset: "ml_default",
    });
    return uploadedResponse.url;
  };

  try {
    const product = await Product.create({
      ...req.body,
      brand: brand.toLowerCase(),
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
  const search = req.query.search;

  try {
    let products;
    if (search) {
      const brand = search.split("/")[0].toLowerCase();
      const year = search.split("/")[1];
      if (brand && year) {
        products = await Product.find({ brand, year });
      } else if (brand) {
        products = await Product.find({ brand });
      } else if (year) {
        products = await Product.find({ year });
      } else {
        products = await Product.find();
      }
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
// DELETE /api/product/:id
// public
router.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json("Deleted!!");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
