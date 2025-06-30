import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';


const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (!(err instanceof ApiError)) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
    }
    res.locals.errorMessage = message;

    const response = {
        code: statusCode,
        message,
        ...(config.env === 'development' && { stack: err.stack })
    };

    if (config.env === 'development') {
        console.error(err)
    }

    res.status(statusCode).send(response);
};

export { errorHandler }