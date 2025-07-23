import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/summary', authenticate, authorizeAdmin, getDashboardStats);

export default router;