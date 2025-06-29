import express from 'express';
import { urlController } from "../../controllers/index.js";
import validate from "../../middlewares/validate.js";
import { urlValidation } from "../../validations/index.js";
import checkIpLimit from "../../middlewares/rateLimiter.js";


const router = express.Router();

const validateUrl = validate(urlValidation.validateShortenUrl);

router.post('/shorten', checkIpLimit, validateUrl, urlController.createUrl);



export default router;