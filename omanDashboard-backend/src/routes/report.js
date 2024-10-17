const express = require("express");
const reportController = require("../controllers/reportController");
const authVerify = require("../middlewares/authVerify");
const reportRoute = express.Router();

reportRoute.use(authVerify);

reportRoute.post("/", reportController.createReport);

reportRoute
  .route("/single/:id")
  .get(reportController.getReport)
  .put(reportController.updateReport)
  .delete(reportController.deleteReport);

reportRoute.get("/list", reportController.getAllReport);

module.exports = reportRoute;
