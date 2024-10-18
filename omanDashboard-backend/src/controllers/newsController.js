const fs = require("fs");
const responseHandler = require("../helpers/responseHandler");
const News = require("../models/newsModel");
const validations = require("../validations");
const uploadDir = "./uploads";

exports.createNews = async (req, res) => {
  try {
    const createNewsValidator = validations.createNewsSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createNewsValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createNewsValidator.error}`
      );
    }

    const slug = req.body.title.en
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    req.body.slug = slug;

    const newNews = await News.create(req.body);
    if (!newNews) {
      return responseHandler(res, 400, `News creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New News created successfull..!`,
      newNews
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "News with this Id is required");
    }

    const findNews = await News.findById(id);
    if (findNews) {
      return responseHandler(res, 200, `News found successfull..!`, findNews);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "News Id is required");
    }

    const { error } = validations.editNewsSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateNews = await News.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateNews) {
      return responseHandler(
        res,
        200,
        `News updated successfull..!`,
        updateNews
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "News Id is required");
    }

    const findNews = await News.findById(id);
    const absolutePath = `${uploadDir}/${findNews.image}`;
    await fs.promises.access(absolutePath);
    await fs.promises.unlink(absolutePath);
    if (!findNews) {
      return responseHandler(res, 404, "News not found");
    }

    const deleteNews = await News.findByIdAndDelete(id);
    if (deleteNews) {
      return responseHandler(res, 200, `News deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const { pageNo = 1, search, type, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.tag = type;
    }
    if (search) {
      filter.$or = [{ "title.en": { $regex: search, $options: "i" } }];
    }
    const totalCount = await News.countDocuments(filter);
    const data = await News.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `News found successfull..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
