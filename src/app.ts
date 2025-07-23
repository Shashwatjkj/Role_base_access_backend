import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { validateEnv } from './utils/validateEnv';
import authRoutes from './routes/auth.routes';
import applicationRoutes from './routes/application.routes';
import adminRoutes from './routes/admin.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { log } from './utils/logger';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/applications', applicationRoutes);
app.use('/admin', adminRoutes);
app.use('/dashboard', dashboardRoutes);

// Connect MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    log('Connected to MongoDB');
    app.listen(PORT, () => log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });