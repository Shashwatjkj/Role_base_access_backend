// import { Schema, model, Document } from 'mongoose';

// export interface IApplication extends Document {
//   name: string;
//   email: string;
//   status: 'pending' | 'verified' | 'approved' | 'rejected';
//   submittedAt: Date;
// }

// const applicationSchema = new Schema<IApplication>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ['pending', 'verified', 'approved', 'rejected'], 
//     default: 'pending' 
//   },
//   submittedAt: { type: Date, default: Date.now },
// });

// export default model<IApplication>('Application', applicationSchema);

import { Schema, model, Document } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  email: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'student';
  employmentAddress?: string;
  loanReason: string;
  status: 'pending' | 'verified' | 'approved' | 'rejected';
  submittedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanTenure: { type: Number, required: true },
  employmentStatus: {
    type: String,
    enum: ['employed', 'unemployed', 'self-employed', 'student'],
    required: true,
  },
  employmentAddress: { type: String },
  loanReason: { type: String, required: true }, // 🆕 added field
  status: {
    type: String,
    enum: ['pending', 'verified', 'approved', 'rejected'],
    default: 'pending',
  },
  submittedAt: { type: Date, default: Date.now },
});

export default model<IApplication>('Application', applicationSchema);
