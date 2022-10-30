module.exports = class ServiceError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode
        this.message = message
    }
}