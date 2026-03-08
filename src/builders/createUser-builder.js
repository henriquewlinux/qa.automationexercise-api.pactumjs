const testData = require('../data/test-data.json');

class CreateUserBuilder {
    constructor() {
        this.book = testData.requestBody.createAccount;
    }

    withWriter(email) {
        this.book.email = email;
        return this;
    }

    build() {
        return this.book;
    }
}

module.exports = CreateUserBuilder;