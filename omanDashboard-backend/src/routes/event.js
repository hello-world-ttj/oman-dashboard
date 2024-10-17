const express = require("express");
const eventController = require("../controllers/eventController");
const authVerify = require("../middlewares/authVerify");
const eventRoute = express.Router();

eventRoute.use(authVerify);

eventRoute.post("/", eventController.createEvent);

eventRoute
  .route("/single/:id")
  .get(eventController.getEvent)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

eventRoute.get("/list", eventController.getAllEvents);

module.exports = eventRoute;
