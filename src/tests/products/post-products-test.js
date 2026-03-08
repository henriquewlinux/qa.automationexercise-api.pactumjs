const { expect } = require('chai');
const Joi = require('joi');
const { postProduct } = require('../../routes/products/post-products-route.js');
const { postCreateUser } = require('../../routes/users/post-users-route.js');
const { getToken } = require('../../routes/login/post-login-route.js');
const schema = require('../../schemas/products/post-products-schema.js');
const CreateProductBuilder = require('../../builders/createProduct-builder.js');
const { faker } = require('@faker-js/faker');
const testData = require('../../data/test-data.json');
const messages = testData.response.products;

describe('Tests referent route POST /produtos', async () => {
  it('Verify create product success', async () => {

    // Arrange
    const data = await postCreateUser();
    const token = await getToken(data.email, data.password);
    const product = new CreateProductBuilder()
      .withName(faker.commerce.productName())
      .build();

    // Action
    const response = await postProduct(product, token);

    // Assert
    expect(response.statusCode).to.eq(201);
    expect(response.json.message).to.equal(messages.createSuccess);

    // Assert Schema
    Joi.assert(response.json, schema.createProductSuccessSchema);
  });

  it('Verify failure create product when name already used', async () => {

    // Arrange
    const data = await postCreateUser();
    const token = await getToken(data.email, data.password);
    const productName = faker.commerce.productName();
    const product = new CreateProductBuilder()
      .withName(productName)
      .build();

    await postProduct(product, token);

    // Action
    const response = await postProduct(product, token);

    // Assert
    expect(response.statusCode).to.eq(400);
    expect(response.json.message).to.equal(messages.nameAlreadyUsed);

    // Assert Schema
    Joi.assert(response.json, schema.createProductFailureSchema);
  });
});
