import { Schema, model, Document } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  email: string;
  status: 'pending' | 'verified' | 'approved' | 'rejected';
  submittedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'approved', 'rejected'], 
    default: 'pending' 
  },
  submittedAt: { type: Date, default: Date.now },
});

export default model<IApplication>('Application', applicationSchema);