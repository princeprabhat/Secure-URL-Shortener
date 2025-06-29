import express from 'express';
import validate from "../middlewares/validate.js";
import { analyticsValidation } from "../validations/index.js";
import { urlController } from '../controllers/index.js';

const router = express.Router();



const validateShortCode = validate(analyticsValidation.validateShortCode);

router.get('/:shortCode', validateShortCode, urlController.redirectUrl);


export default router;