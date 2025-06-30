import express from 'express';
import urlRoutes from './url.route.js';
import analyticsRoutes from './analytics.route.js';

const router = express.Router();

router.use('/analytics', analyticsRoutes);
router.use('/', urlRoutes);


export default router;