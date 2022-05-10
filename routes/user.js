const router = require("express").Router();
const Product = require("../modals/Product");
const { cloudinary } = require("../cloudinary");

// Post product
// POST /api/user/post
// public
router.post("/user/post", async (req, res) => {
  const { brand, model, img1, img2, img3 } = req.body;

  const imgRes1 = await cloudinary.uploader.upload(img1, {
    upload_preset: "ml_default",
  });
  const imgRes2 = await cloudinary.uploader.upload(img2, {
    upload_preset: "ml_default",
  });
  const imgRes3 = await cloudinary.uploader.upload(img3, {
    upload_preset: "ml_default",
  });

  try {
    const product = await Product.create({
      ...req.body,
      brand: brand.toLowerCase(),
      model: model.toLowerCase(),
      images: {
        main: imgRes1.url,
        extra1: imgRes2.url,
        extra2: imgRes3.url,
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
      const model = search.split("/")[1].toLowerCase();
      const year = search.split("/")[2];
      if (brand && model && year) {
        products = await Product.find({ brand, model, year });
      } else if (brand && model) {
        products = await Product.find({ brand, model });
      } else if (brand && year) {
        products = await Product.find({ brand, year });
      } else if (model && year) {
        products = await Product.find({ model, year });
      } else if (brand) {
        products = await Product.find({ brand });
      } else if (model) {
        products = await Product.find({ model });
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
