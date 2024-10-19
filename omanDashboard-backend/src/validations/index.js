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
});

exports.editGallerySchema = Joi.object({
  title: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
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
});

exports.createEventSchema = Joi.object({
  title: Joi.object({
    en: Joi.string().required(),
    ar: Joi.string().required(),
  }).required(),
  image: Joi.string().required(),
  video: Joi.string().required(),
  status: Joi.string(),
});

exports.editEventSchema = Joi.object({
  title: Joi.object({
    en: Joi.string(),
    ar: Joi.string(),
  }),
  image: Joi.string(),
  video: Joi.string(),
  status: Joi.string(),
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
});

exports.createReportSchema = Joi.object({
  image: Joi.string().required(),
  media: Joi.string().required(),
  status: Joi.string(),
});
exports.editReportSchema = Joi.object({
  image: Joi.string(),
  media: Joi.string(),
  status: Joi.string(),
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
});
