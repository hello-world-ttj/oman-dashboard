const fs = require("fs");
const responseHandler = require("../helpers/responseHandler");
const User = require("../models/userModel");
const validations = require("../validations");
const sendSelfMail = require("../utils/sendSelfMail");
const uploadDir = "./uploads";

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
      return responseHandler(res, 200, `User found successfull..!`, findUser);
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

    const findUser = await User.findById(id);
    if (!findUser) {
      return responseHandler(res, 404, "User not found");
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
    const { pageNo = 1, search, type, site, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.type = { $in: [type] };
    }
    if (site) {
      filter.site = { $in: [site] };
    }
    if (search) {
      filter.$or = [{ "name.en": { $regex: search, $options: "i" } }];
    }
    const totalCount = await User.countDocuments(filter);
    const data = await User.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ priority: 1 })
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

exports.sendMail = async (req, res) => {
  try {
    const { from, subject, text, to } = req.body;
    const attachment = req.file;

    if (!from || !subject || !text || !to) {
      return responseHandler(res, 400, "Missing required fields");
    }

    const data = {
      from,
      subject,
      text,
      attachment,
    };

    await sendSelfMail(data, to);

    return responseHandler(res, 200, "Email sent successfully");
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
