const express = require("express");
const galleryController = require("../controllers/galleryController");
const authVerify = require("../middlewares/authVerify");
const galleryRoute = express.Router();

galleryRoute.use(authVerify);

galleryRoute.post("/", galleryController.createGallery);

galleryRoute
  .route("/single/:id")
  .get(galleryController.getGallery)
  .put(galleryController.updateGallery)
  .delete(galleryController.deleteGallery);

galleryRoute.get("/list", galleryController.getAllGallery);

module.exports = galleryRoute;
