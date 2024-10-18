const fs = require("fs");
const responseHandler = require("../helpers/responseHandler");
const Report = require("../models/reportModel");
const validations = require("../validations");
const uploadDir = "./uploads";

exports.createReport = async (req, res) => {
  try {
    const createReportValidator = validations.createReportSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createReportValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createReportValidator.error}`
      );
    }

    const newReport = await Report.create(req.body);
    if (!newReport) {
      return responseHandler(res, 400, `Report creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Report created successfull..!`,
      newReport
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Report with this Id is required");
    }

    const findReport = await Report.findById(id);
    if (findReport) {
      return responseHandler(
        res,
        200,
        `Report found successfull..!`,
        findReport
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Report Id is required");
    }

    const { error } = validations.editReportSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateReport = await Report.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateReport) {
      return responseHandler(
        res,
        200,
        `Report updated successfull..!`,
        updateReport
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Report Id is required");
    }

    const findReport = await Report.findById(id);
    const absolutePath = `${uploadDir}/${findReport.image}`;
    const absolutePathMedia = `${uploadDir}/${findReport.media}`;
    await fs.promises.access(absolutePathMedia);
    await fs.promises.unlink(absolutePathMedia);
    await fs.promises.access(absolutePath);
    await fs.promises.unlink(absolutePath);
    if (!findReport) {
      return responseHandler(res, 404, "Report not found");
    }

    const deleteReport = await Report.findByIdAndDelete(id);
    if (deleteReport) {
      return responseHandler(res, 200, `Report deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllReport = async (req, res) => {
  try {
    const { pageNo = 1, type, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.type = type;
    }
    const totalCount = await Report.countDocuments(filter);
    const data = await Report.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Report found successfull..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
