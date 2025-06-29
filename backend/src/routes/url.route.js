import express from 'express';
import { urlController } from "../controllers/index.js";
import validate from "../middlewares/validate";
import { analyticsValidation, urlValidation } from "../validations";


const router = express.Router();

const validateUrl = validate(urlValidation.validateShortenUrl);

router.post('/shorten', validateUrl, urlController.createUrl);

const validateShortCode = validate(analyticsValidation.validateShortCode);

router.get('/:code', validateShortCode, urlController.redirectUrl);

export default router;