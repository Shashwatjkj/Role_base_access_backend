import express from 'express';
import {
  submitApplication,
  getPendingApplications,
  updateApplicationStatus,
} from '../controllers/application.controller';

import {
  authenticate,
  authorizeAdmin,
  authorizeVerifierOrAdmin,
} from '../middlewares/auth.middleware';

const router = express.Router();

// Open route
router.post('/submit', submitApplication);

// Only admin can view pending applications
router.get('/pending', getPendingApplications);

// Verifier or Admin can change status
router.post('/status/:id', authenticate, authorizeVerifierOrAdmin, updateApplicationStatus);

export default router;