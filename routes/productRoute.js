const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthentcated, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthentcated, authorizeRole("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthentcated, authorizeRole("admin"), updateProduct)
  .delete(isAuthentcated, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthentcated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthentcated, deleteReview);
module.exports = router;
