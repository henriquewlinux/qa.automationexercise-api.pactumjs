const Joi = require('joi');

const createAccountSuccessSchema = Joi.object({
    message: Joi.string().required(),
    _id: Joi.string().required()
});

const createAccountFailureSchema = Joi.alternatives().try(
    Joi.object({ message: Joi.string().required() }),
    Joi.object({ email: Joi.string().required() })
);

module.exports = { createAccountSuccessSchema, createAccountFailureSchema };