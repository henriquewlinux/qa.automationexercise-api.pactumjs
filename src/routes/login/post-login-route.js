require('dotenv').config();
const { spec } = require('pactum');
const HeadersBuilder = require('../../builders/headers-builder.js');

async function postLogin(email, password) {
    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build()

    return await
        spec()
            .post(`${process.env.URL}/login`)
            .withHeaders(headers)
            .withJson({
                "email": email,
                "password": password
            })
}

async function getToken(email, password) {
    const headers = new HeadersBuilder()
        .withContentType('application/json')
        .build()

    let token = await
        spec()
            .post(`${process.env.URL}/login`)
            .withHeaders(headers)
            .withJson({
                "email": email,
                "password": password
            })

    return token.json.authorization
}

module.exports = { postLogin, getToken };