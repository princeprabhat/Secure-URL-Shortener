import ApiError from "../utils/ApiError.js";
import pick from "../utils/pick.js";
import Joi from "joi";
import httpStatus from 'http-status';




const validate = (schema) => (req, res, next) => {

    if (Object.keys(req.body).length !== 0 && !req.is('application/json')) {
        return next(
            new ApiError(
                httpStatus.UNSUPPORTED_MEDIA_TYPE,
                'Supports JSON request body only'
            )
        );
    }

    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((d) => d.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
};

export default validate;
