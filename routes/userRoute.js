const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updatedProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthentcated, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);
router.route("/me").get(isAuthentcated, getUserDetails);
router.route("/password/update").put(isAuthentcated, updatePassword);
router.route("/me/update").put(isAuthentcated, updatedProfile);
router
  .route("/admin/users")
  .get(isAuthentcated, authorizeRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthentcated, authorizeRole("admin"), getSingleUser)
  .put(isAuthentcated, authorizeRole("admin"), updateUserRole)
  .delete(isAuthentcated, authorizeRole("admin"), deleteUser);

module.exports = router;
