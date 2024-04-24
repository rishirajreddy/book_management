import Joi from "joi";

export const checkUserInputValidation = async (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().required(),
    phone: Joi.string().optional(),
    country_code: Joi.string().optional(),
    password: Joi.string().required(),
  });
  const result = userSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      message: result.error.message,
      details: result.error.details,
    });
  }

  next();
};

export const checkBookInputValidation = async (req, res, next) => {
  const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publication_year: Joi.number().optional(),
    publisher: Joi.string().optional(),
    genre: Joi.string().optional(),
  });
  const result = bookSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      message: result.error.message,
      details: result.error.details,
    });
  }

  next();
};
