const express = require("express");
const careerController = require("../controllers/careerController");
const authVerify = require("../middlewares/authVerify");
const careerRoute = express.Router();

careerRoute.use(authVerify);

careerRoute.post("/", careerController.createCareer);

careerRoute
  .route("/single/:id")
  .get(careerController.getCareer)
  .put(careerController.updateCareer)
  .delete(careerController.deleteCareer);

careerRoute.get("/list", careerController.getAllCareer);

module.exports = careerRoute;
