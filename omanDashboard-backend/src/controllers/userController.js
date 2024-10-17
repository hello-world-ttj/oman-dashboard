const responseHandler = require("../helpers/responseHandler");
const User = require("../models/userModel");
const validations = require("../validations");

exports.createUser = async (req, res) => {
  try {
    const createUserValidator = validations.createUserSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createUserValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createUserValidator.error}`
      );
    }

    const newUser = await User.create(req.body);
    if (!newUser) {
      return responseHandler(res, 400, `Usercreation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New User created successfull..!`,
      newUser
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "User with this Id is required");
    }

    const findUser = await User.findById(id);
    if (findUser) {
      return responseHandler(
        res,
        200,
        `User found successfull..!`,
        findUser
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "User Id is required");
    }

    const { error } = validations.editUserSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateUser) {
      return responseHandler(
        res,
        200,
        `User updated successfull..!`,
        updateUser
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "User Id is required");
    }

    const deleteUser = await User.findByIdAndDelete(id);
    if (deleteUser) {
      return responseHandler(res, 200, `User deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const { pageNo = 1, status, type, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.type = type;
    }
    const totalCount = await User.countDocuments(filter);
    const data = await User.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `User found successfull..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
