const fs = require("fs");
const responseHandler = require("../helpers/responseHandler");
const Event = require("../models/eventModel");
const validations = require("../validations");
const uploadDir = "./uploads";

exports.createEvent = async (req, res) => {
  try {
    const createEventValidator = validations.createEventSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );

    if (createEventValidator.error) {
      return responseHandler(
        res,
        400,
        `Invalid input: ${createEventValidator.error}`
      );
    }

    const newEvent = await Event.create(req.body);
    if (!newEvent) {
      return responseHandler(res, 400, `Event creation failed...!`);
    }
    return responseHandler(
      res,
      201,
      `New Event created successfull..!`,
      newEvent
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Event with this Id is required");
    }

    const findEvent = await Event.findById(id);
    if (findEvent) {
      return responseHandler(res, 200, `Event found successfull..!`, findEvent);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Event Id is required");
    }

    const { error } = validations.editEventSchema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return responseHandler(res, 400, `Invalid input: ${error.message}`);
    }

    const updateEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateEvent) {
      return responseHandler(
        res,
        200,
        `Event updated successfull..!`,
        updateEvent
      );
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, "Event Id is required");
    }

    const findEvent = await Event.findById(id);
    const absolutePath = `${uploadDir}/${findEvent.image}`;
    await fs.promises.access(absolutePath);
    await fs.promises.unlink(absolutePath);
    if (!findEvent) {
      return responseHandler(res, 404, "Event not found");
    }

    const deleteEvent = await Event.findByIdAndDelete(id);
    if (deleteEvent) {
      return responseHandler(res, 200, `Event deleted successfull..!`);
    }
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};

exports.getAllEvents = async (req, res) => {
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
      ];
    }
    const totalCount = await Event.countDocuments(filter);
    const data = await Event.find(filter)
      .skip(skipCount)
      .limit(limit)
      .sort({ createdAt: -1, _id: 1 })
      .lean();

    return responseHandler(
      res,
      200,
      `Events found successfull..!`,
      data,
      totalCount
    );
  } catch (error) {
    return responseHandler(res, 500, `Internal Server Error ${error.message}`);
  }
};
