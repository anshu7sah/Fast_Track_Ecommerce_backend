const express = require("express");
const router = express.Router();

const { isAuthentcated, authorizeRole } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/now").post(isAuthentcated, newOrder);
router.route("/order/:id").get(isAuthentcated, getSingleOrder);
router.route("/orders/me").get(isAuthentcated, myOrders);
router
  .route("/admin/orders")
  .get(isAuthentcated, authorizeRole("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthentcated, authorizeRole("admin"), updateOrder)
  .delete(isAuthentcated, authorizeRole("admin"), deleteOrder);
module.exports = router;
