const { expect } = require('chai');
const Joi = require('joi');
const { getProduct } = require('../../routes/products/get-products-route.js');
const { postCreateProduct } = require('../../routes/products/post-products-route.js');
const { postCreateUser } = require('../../routes/users/post-users-route.js');
const { getToken } = require('../../routes/login/post-login-route.js');
const schema = require('../../schemas/products/get-products-schema.js');

describe('Tests referent route GET /produtos', async () => {
  it('Verify get product success', async () => {

    // Arrange
    const data = await postCreateUser();
    const token = await getToken(data.email, data.password);
    const { _id, nome } = await postCreateProduct(token);

    // Action
    const response = await getProduct(_id);

    // Assert
    expect(response.statusCode).to.eq(200);
    expect(response.json.quantidade).to.eq(1);
    expect(response.json.produtos[0].nome).to.equal(nome);

    // Assert Schema
    Joi.assert(response.json, schema.getProductSuccessSchema);
  });

  it('Verify get product returns empty when id not found', async () => {

    // Arrange
    const id = 'invalidId000';

    // Action
    const response = await getProduct(id);

    // Assert
    expect(response.statusCode).to.eq(200);
    expect(response.json.quantidade).to.eq(0);
    expect(response.json.produtos).to.have.length(0);

    // Assert Schema
    Joi.assert(response.json, schema.getProductEmptySchema);
  });
});
