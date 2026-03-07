const { expect } = require('chai');
const Joi = require('joi')
const { postUser } = require('../../routes/users/post-users-route.js');
const schema = require('../../schemas/users/post-users-schema.js')
const CreateUserBuilder = require('../../builders/createUser-builder.js')
const { faker } = require('@faker-js/faker');
const testData = require('../../data/test-data.json');
const messages = testData.response.users;

describe('Tests referent route POST /usuarios', async () => {
  it('Verify create account success', async () => {

    // Arrange
    const email = faker.internet.email()
    const data = new CreateUserBuilder()
      .withWriter(email)
      .build()

    // Action
    response = await postUser(data)

    // Assert
    expect(response.statusCode).to.eq(201)
    expect(response.json.message).to.equal(messages.createSuccess);

    // Assert Schema
    Joi.assert(response.json, schema.createAccountSuccessSchema)
  })

  it('Verify failure create account when email already used', async () => {

    // Arrange
    const email = faker.internet.email()
    const data = new CreateUserBuilder()
      .withWriter(email)
      .build()

    await postUser(data)

    // Action
    response = await postUser(data)

    // Assert
    expect(response.statusCode).to.eq(400)
    expect(response.json.message).to.equal(messages.emailAlreadyUsed);

    // Assert Schema
    Joi.assert(response.json, schema.createAccountFailureSchema)
  })

  it('Verify failure create account when email is invalid', async () => {

    // Arrange
    const email = faker.internet.email()
    const data = new CreateUserBuilder()
      .withWriter(email)
      .build()
    
    data.email = 'mail-invalid.com'

    // Action
    response = await postUser(data)

    // Assert
    expect(response.statusCode).to.eq(400)
    expect(response.json.email).to.equal(messages.invalidEmail);

    // Assert Schema
    Joi.assert(response.json, schema.createAccountFailureSchema)
  })
});