import { Request, Response } from 'express';
import Application from '../model/Application';

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const app = new Application({ name, email });
    await app.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting application', err });
  }
};

export const getPendingApplications = async (_req: Request, res: Response) => {
  try {
    const pending = await Application.find({ status: 'pending' });
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending applications', err });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['verified', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Application not found' });

    res.status(200).json({ message: `Application ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', err });
  }
};