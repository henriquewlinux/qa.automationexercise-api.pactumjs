const { expect } = require('chai');
const Joi = require('joi');
const { deleteUser } = require('../../routes/users/delete-users-route.js');
const { postCreateUserAndGetId } = require('../../routes/users/post-users-route.js');
const schema = require('../../schemas/users/delete-users-schema.js');
const testData = require('../../data/test-data.json');
const messages = testData.response.users;

describe('Tests referent route DELETE /usuarios', async () => {
  it('Verify delete user success', async () => {

    // Arrange
    const id = await postCreateUserAndGetId();

    // Action
    const response = await deleteUser(id);

    // Assert
    expect(response.statusCode).to.eq(200);
    expect(response.json.message).to.equal(messages.deleteSuccess);

    // Assert Schema
    Joi.assert(response.json, schema.deleteUserSuccessSchema);
  });

  it('Verify failure delete user when id is invalid', async () => {

    // Arrange
    const id = 'invalidId000';

    // Action
    const response = await deleteUser(id);

    // Assert
    expect(response.statusCode).to.eq(200);
    expect(response.json.message).to.equal(messages.deleteNotFound);

    // Assert Schema
    Joi.assert(response.json, schema.deleteUserFailureSchema);
  });
});
