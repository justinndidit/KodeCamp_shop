const {
  signUpUser,
  getAllUsers,
  getUser,
  deleteUser,
  loginUser,
} = require("../controller/user");
const { Router } = require("express");
const router = Router();
const { authorized, verifyToken } = require("../middlewares/auth");

router.route("/signup").post(signUpUser);
router.route("/login").post(loginUser);
router.route("/").get(verifyToken, authorized("admin"), getAllUsers);
router
  .route("/:id")
  .get(getUser)
  .delete(verifyToken, authorized("admin"), deleteUser);

module.exports = { router };
