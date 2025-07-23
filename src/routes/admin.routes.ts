import express from 'express';
import { addAdmin, deleteAdmin } from '../controllers/admin.controller';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// Admin-only routes
router.post('/add', authenticate, authorizeAdmin, addAdmin);
router.delete('/delete/:id', authenticate, authorizeAdmin, deleteAdmin);

export default router;