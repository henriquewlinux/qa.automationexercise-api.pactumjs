class HeadersBuilder {
    constructor() {
        this.headers = {}
    }

    withContentType(contentType) {
        this.headers["Content-Type"] = contentType
        return this
    }

    withCookie(token) {
        this.headers["Cookie"] = `token=${token}`
        return this
    }

    withAuthorization(token) {
        this.headers["Authorization"] = token
        return this
    }

    withAccept(accept){
        this.headers["Accept"] = accept
        return this
    }

    build() {
        return this.headers
    }
}

module.exports = HeadersBuilder;