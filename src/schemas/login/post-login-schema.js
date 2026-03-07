const Joi = require('joi');

const loginSuccessSchema = Joi.object({
    message: Joi.string().required(),
    authorization: Joi.string().required()
});

const loginFailureSchema = Joi.alternatives().try(
    Joi.object({ message: Joi.string().required() }),
    Joi.object({ password: Joi.string().required() }),
    Joi.object({ email: Joi.string().required() })
);

module.exports = { loginSuccessSchema, loginFailureSchema };
