require('dotenv').config();
const { spec } = require('pactum');
const HeadersBuilder = require('../../builders/headers-builder.js');

async function getProduct(id) {

    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build();

    return await
        spec()
            .get(`${process.env.URL}/produtos`)
            .withHeaders(headers)
            .withQueryParams('_id', id);
}

module.exports = { getProduct };
