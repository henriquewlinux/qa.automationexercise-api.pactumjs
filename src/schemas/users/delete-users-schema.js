const Joi = require('joi');

const deleteUserSuccessSchema = Joi.object({
    message: Joi.string().required()
});

const deleteUserFailureSchema = Joi.object({
    message: Joi.string().required()
});

module.exports = { deleteUserSuccessSchema, deleteUserFailureSchema };
