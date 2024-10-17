const responseHandler = require("../helpers/responseHandler");
const Career = require("../models/careerModel");
const validations = require("../validations");

exports.createCareer = async (req, res) => {
  try {
    const createCareerValidator = validations.createCareerSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createCareerValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createCareerValidator.error}`
      );
    }

    const newCareer = await Career.create(req.body);
    if (!newCareer) {
      return responseHandler(res, 400, `Career creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Career created successfull..!`,
      newCareer
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getCareer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Career with this Id is required");
    }

    const findCareer = await Career.findById(id);
    if (findCareer) {
      return responseHandler(
        res,
        200,
        `Career found successfull..!`,
        findCareer
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Career Id is required");
    }

    const { error } = validations.editCareerSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateCareer = await Career.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateCareer) {
      return responseHandler(
        res,
        200,
        `Career updated successfull..!`,
        updateCareer
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Career Id is required");
    }

    const deleteCareer = await Career.findByIdAndDelete(id);
    if (deleteCareer) {
      return responseHandler(res, 200, `career deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllCareer = async (req, res) => {
  try {
    const { pageNo = 1, status, type, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.type = type;
    }
    const totalCount = await Career.countDocuments(filter);
    const data = await Career.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Career found successfull..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
