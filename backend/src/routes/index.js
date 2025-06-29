import express from 'express';
import urlRoute from './url.route.js';
import analyticsRoute from './analytics.route.js';


const router = express.Router();

router.use('/analytics', analyticsRoute);

router.use('/', urlRoute);


export default router;