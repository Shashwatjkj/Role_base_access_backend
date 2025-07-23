import { Request, Response } from 'express';
import { getSummaryStats } from '../services/dashboard.service';

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getSummaryStats();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error loading dashboard stats', err });
  }
};
