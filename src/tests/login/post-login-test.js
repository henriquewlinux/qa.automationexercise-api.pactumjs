const { expect } = require('chai');
const Joi = require('joi');
const schema = require('../../schemas/login/post-login-schema.js');
const { postLogin } = require('../../routes/login/post-login-route.js');
const {postCreateUser} = require('../../routes/users/post-users-route.js');
const testData = require('../../data/test-data.json');
const messages = testData.response.login;

describe('Tests referent route POST /login', async () => {
  it('Verify login success', async () => {

    // Arrange
    const data = await postCreateUser();

    // Action
    const response = await postLogin(data.email, data.password);

    // Assert
    expect(response.statusCode).to.eq(200);
    expect(response.json.message).to.equal(messages.success);

    // Assert Schema
    Joi.assert(response.json, schema.loginSuccessSchema);
  });

  it('Verify failure login when email does not exist', async () => {

    // Arrange
    const email = 'mailnotexist@qa.com.br';
    const password = 'senha123';

    // Action
    const response = await postLogin(email, password);

    // Assert
    expect(response.statusCode).to.eq(401);
    expect(response.json.message).to.equal(messages.invalidCredentials);

    // Assert Schema
    Joi.assert(response.json, schema.loginFailureSchema);
  });

  it('Verify failure login when password is missing', async () => {

    // Arrange
    const email = 'mailnotexist@qa.com.br';

    // Action
    const response = await postLogin(email, '');

    // Assert
    expect(response.statusCode).to.eq(400);
    expect(response.json.password).to.equal(messages.missingPassword);

    // Assert Schema
    Joi.assert(response.json, schema.loginFailureSchema);
  });

  it('Verify failure login when email is missing', async () => {

    // Arrange
    const password = 'senha123';

    // Action
    const response = await postLogin('', password);

    // Assert
    expect(response.statusCode).to.eq(400);
    expect(response.json.email).to.equal(messages.missingEmail);

    // Assert Schema
    Joi.assert(response.json, schema.loginFailureSchema);
  });
});