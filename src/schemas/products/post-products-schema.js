const Joi = require('joi');

const createProductSuccessSchema = Joi.object({
    message: Joi.string().required(),
    _id: Joi.string().required()
});

const createProductFailureSchema = Joi.object({
    message: Joi.string().required()
});

module.exports = { createProductSuccessSchema, createProductFailureSchema };
