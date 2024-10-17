const express = require("express");
const userController = require("../controllers/userController");
const authVerify = require("../middlewares/authVerify");
const userRoute = express.Router();

userRoute.use(authVerify);

userRoute.post("/", userController.createUser);

userRoute
  .route("/single/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRoute.get("/list", userController.getAllUser);

module.exports = userRoute;
