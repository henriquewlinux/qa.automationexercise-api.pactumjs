require('dotenv').config();
const { spec } = require('pactum');
const HeadersBuilder = require('../../builders/headers-builder.js');

async function deleteUser(id) {

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build();

    return await
        spec()
            .delete(`${process.env.URL}/usuarios/${id}`)
            .withHeaders(headers);
}

module.exports = { deleteUser };
