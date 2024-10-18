const responseHandler = require("../helpers/responseHandler");
const Product = require("../models/productModel");
const validations = require("../validations");

exports.createProduct = async (req, res) => {
  try {
    const createProductValidator = validations.createProductSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createProductValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createProductValidator.error}`
      );
    }

    const newProduct = await Product.create(req.body);
    if (!newProduct) {
      return responseHandler(res, 400, `Product creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Product created successfull..!`,
      newProduct
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Product with this Id is required");
    }

    const findProduct = await Product.findById(id);
    if (findProduct) {
      return responseHandler(
        res,
        200,
        `Product found successfull..!`,
        findProduct
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Product Id is required");
    }

    const { error } = validations.editProductSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (this.updateProduct) {
      return responseHandler(
        res,
        200,
        `Product updated successfull..!`,
        updateProduct
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Product Id is required");
    }

    const deleteProduct = await Product.findByIdAndDelete(id);
    if (deleteProduct) {
      return responseHandler(res, 200, `Product deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const { pageNo = 1, search, type, limit = 10 } = req.query;
    const skipCount = 10 * (pageNo - 1);
    const filter = {};
    if (type) {
      filter.type = type;
    }

    if (search) {
      filter.$or = [
        { "title.en": { $regex: search, $options: "i" } },
        { "description.en": { $regex: search, $options: "i" } },
      ];
    }
    const totalCount = await Product.countDocuments(filter);
    const data = await Product.find(filter)
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
