class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = "") {
        super(message || 'Error');
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = stack;
        }
    }
}


export default ApiError;