const Joi = require('joi');

const getProductSuccessSchema = Joi.object({
    quantidade: Joi.number().required(),
    produtos: Joi.array().items(
        Joi.object({
            nome: Joi.string().required(),
            preco: Joi.number().required(),
            descricao: Joi.string().required(),
            quantidade: Joi.number().required(),
            _id: Joi.string().required()
        })
    ).required()
});

const getProductEmptySchema = Joi.object({
    quantidade: Joi.number().valid(0).required(),
    produtos: Joi.array().length(0).required()
});

module.exports = { getProductSuccessSchema, getProductEmptySchema };
