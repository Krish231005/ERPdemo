const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/createProduct', upload.single('image'), productController.createProduct);
router.get("/getproducts", productController.getProducts);
router.get('/product/:id', productController.getProductDetails);
router.get('/category/:category', productController.getProductsByCategory);
module.exports = router;
