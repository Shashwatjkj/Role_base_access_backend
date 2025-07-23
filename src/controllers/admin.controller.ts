import { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';

export const addAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const admin = new User({ username, password: hashed, role: role });
    await admin.save();

    res.status(201).json({ message: `${role} added` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add admin', err });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete admin', err });
  }
};