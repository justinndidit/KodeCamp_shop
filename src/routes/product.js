const { Router } = require("express");
const router = Router();
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.js");
const { authorized, verifyToken } = require("../middlewares/auth");

router.route("/add-product").post(verifyToken, authorized("admin"), addProduct);
router
  .route("/:id")
  .get(verifyToken, getProduct)
  .patch(verifyToken, authorized("admin"), updateProduct)
  .delete(verifyToken, authorized("admin"), deleteProduct);
router.route("/").get(verifyToken, getAllProducts);

module.exports = {
  router,
};
