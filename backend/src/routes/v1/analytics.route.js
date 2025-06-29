import express from 'express';
import validate from "../../middlewares/validate.js";
import { analyticsValidation } from "../../validations/index.js";
import { analyticsController } from "../../controllers/index.js";

const router = express.Router();


const validateShortCode = validate(analyticsValidation.validateShortCode);

router.get('/:shortCode', validateShortCode, analyticsController.getUrlAnalytics);




export default router;