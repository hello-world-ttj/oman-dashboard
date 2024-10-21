const Joi = require("joi");

exports.createAdminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  status: Joi.boolean(),
});
exports.editAdminSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  status: Joi.boolean(),
});
exports.createGallerySchema = Joi.object({
  title: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  image: Joi.string().required(),
  site: Joi.array().required(),
});

exports.editGallerySchema = Joi.object({
  title: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
  site: Joi.array(),
});
exports.createCareerSchema = Joi.object({
  description: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  title: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  image: Joi.string().required(),
  expiryDate: Joi.date().required(),
  status: Joi.boolean(),
  site: Joi.array().required(),
});

exports.editCareerSchema = Joi.object({
  description: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  title: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
  expiryDate: Joi.date(),
  status: Joi.boolean(),
  site: Joi.array(),
});

exports.createEventSchema = Joi.object({
  title: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  image: Joi.string().required(),
  video: Joi.string().required(),
  status: Joi.string(),
  site: Joi.array().required(),
});

exports.editEventSchema = Joi.object({
  title: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
  video: Joi.string(),
  status: Joi.string(),
  site: Joi.array(),
});

exports.createNewsSchema = Joi.object({
  tag: Joi.string().required(),
  title: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  content: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  image: Joi.string().required(),
  banner: Joi.string().required(),
  status: Joi.string().valid("published", "unpublished"),
  site: Joi.array().required(),
});

exports.editNewsSchema = Joi.object({
  tag: Joi.string(),
  title: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  content: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
  banner: Joi.string(),
  status: Joi.string().valid("published", "unpublished"),
  site: Joi.array(),
});

exports.createReportSchema = Joi.object({
  image: Joi.string().required(),
  media: Joi.string().required(),
  status: Joi.string(),
  site: Joi.array().required(),
});
exports.editReportSchema = Joi.object({
  image: Joi.string(),
  media: Joi.string(),
  status: Joi.string(),
  site: Joi.array(),
});

exports.createUserSchema = Joi.object({
  name: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  designation: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  bio: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  image: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.string(),
  site: Joi.array().required(),
});

exports.editUserSchema = Joi.object({
  name: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  designation: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  bio: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
  type: Joi.string(),
  status: Joi.string(),
  site: Joi.array(),
});
