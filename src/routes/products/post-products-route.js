require('dotenv').config();
const { spec } = require('pactum');
const HeadersBuilder = require('../../builders/headers-builder.js');

async function postProduct(data, token) {

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .withAuthorization(token)
        .build();

    return await
        spec()
            .post(`${process.env.URL}/produtos`)
            .withHeaders(headers)
            .withJson(data);
}

async function postCreateProduct(token) {

    const { faker } = require('@faker-js/faker');
    const CreateProductBuilder = require('../../builders/createProduct-builder.js');

    const product = new CreateProductBuilder()
        .withName(faker.commerce.productName())
        .build();

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .withAuthorization(token)
        .build();

    const response = await
        spec()
            .post(`${process.env.URL}/produtos`)
            .withHeaders(headers)
            .withJson(product);

    return { _id: response.json._id, nome: product.nome };
}

module.exports = { postProduct, postCreateProduct };
