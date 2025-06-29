import Joi from "joi";

const validateShortCode = {
    params: Joi.object().keys({
        shortCode: Joi.string()
            .alphanum()
            .min(6)
            .required()
            .messages({
                'string.alphanum': 'Short code must be alphanumeric',
                'string.min': 'Short code must be at least 6 characters',
                'any.required': 'Short code is required in params',
            }),
    }),
};

export default { validateShortCode };