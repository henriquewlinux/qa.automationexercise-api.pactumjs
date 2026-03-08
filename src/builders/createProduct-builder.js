const testData = require('../data/test-data.json');

class CreateProductBuilder {
    constructor() {
        this.book = { ...testData.requestBody.createProduct };
    }

    withName(name) {
        this.book.nome = name;
        return this;
    }

    build() {
        return this.book;
    }
}

module.exports = CreateProductBuilder;
