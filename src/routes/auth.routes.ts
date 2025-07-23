import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// Only admin can register new users (verifier/admin)
router.post('/register', authenticate, authorizeAdmin, register);
router.post('/login', login);

export default router;