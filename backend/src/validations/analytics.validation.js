const validateShortCode = {
    params: Joi.object().keys({
        shortCode: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required()
            .messages({
                'string.alphanum': 'Short code must be alphanumeric',
                'string.min': 'Short code must be at least 3 characters',
                'string.max': 'Short code must be at most 10 characters',
                'any.required': 'Short code is required in params',
            }),
    }),
};

export default { validateShortCode };