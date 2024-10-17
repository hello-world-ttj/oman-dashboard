const express = require("express");
const productController = require("../controllers/productController");
const authVerify = require("../middlewares/authVerify");
const productRoute = express.Router();

productRoute.use(authVerify);

productRoute.post("/", productController.createProduct);

productRoute
  .route("/single/:id")
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

productRoute.get("/list", productController.getAllProduct);

module.exports = productRoute;
