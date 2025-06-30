import Joi from "joi";

const validateShortenUrl = {
    body: Joi.object().keys({
        originalUrl: Joi.string()
            .uri({ scheme: ['http', 'https'] })
            .required()
            .messages({
                'string.uri': 'Original URL must be a valid HTTP or HTTPS URL',
                'any.required': 'Original URL is required',
            }),
    }),
};

export default { validateShortenUrl };
