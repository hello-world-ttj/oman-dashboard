const fs = require("fs");
const responseHandler = require("../helpers/responseHandler");
const validations = require("../validations");
const Gallery = require("../models/galleryModel");
const uploadDir = "./uploads";

exports.createGallery = async (req, res) => {
  try {
    const createGalleryValidator = validations.createGallerySchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createGalleryValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createGalleryValidator.error}`
      );
    }

    const newGallery = await Gallery.create(req.body);
    if (!newGallery) {
      return responseHandler(res, 400, `Gallery creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Gallery created successfull..!`,
      newGallery
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getGallery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Gallery with this Id is required");
    }

    const findGallery = await Gallery.findById(id);
    if (findGallery) {
      return responseHandler(
        res,
        200,
        `Gallery found successfull..!`,
        findGallery
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Gallery Id is required");
    }

    const { error } = validations.editGallerySchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateGallery = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateGallery) {
      return responseHandler(
        res,
        200,
        `Gallery updated successfull..!`,
        updateGallery
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Gallery Id is required");
    }

    const findGallery = await Gallery.findById(id);
    const absolutePath = `${uploadDir}/${findGallery.image}`;
    await fs.promises.access(absolutePath);
    await fs.promises.unlink(absolutePath);
    if (!findGallery) {
      return responseHandler(res, 404, "Gallery not found");
    }

    const deleteGallery = await Gallery.findByIdAndDelete(id);
    if (deleteGallery) {
      return responseHandler(res, 200, `Gallery deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const { pageNo = 1, search, site, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (site) {
      filter.site = { $in: [site] };
    }
    if (search) {
      filter.$or = [{ "title.en": { $regex: search, $options: "i" } }];
    }
    const totalCount = await Gallery.countDocuments(filter);
    const data = await Gallery.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `product found successfull..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
