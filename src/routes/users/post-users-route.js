require('dotenv').config();
const { spec } = require('pactum');
const { faker } = require('@faker-js/faker');
const HeadersBuilder = require('../../builders/headers-builder.js');
const CreateUserBuilder = require('../../builders/createUser-builder.js');

async function postUser(data) {

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build();

    return await
        spec()
            .post(`${process.env.URL}/usuarios`)
            .withHeaders(headers)
            .withJson(data);
}

async function postCreateUser() {

    const email = faker.internet.email();
    const data = new CreateUserBuilder()
      .withWriter(email)
      .build();

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build();

    await
        spec()
            .post(`${process.env.URL}/usuarios`)
            .withHeaders(headers)
            .withJson(data);
    
    return data; 
}

async function postCreateUserAndGetId() {

    const email = faker.internet.email();
    const data = new CreateUserBuilder()
      .withWriter(email)
      .build();

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build();

    const response = await
        spec()
            .post(`${process.env.URL}/usuarios`)
            .withHeaders(headers)
            .withJson(data);

    return response.json._id;
}

module.exports = { postUser, postCreateUser, postCreateUserAndGetId };