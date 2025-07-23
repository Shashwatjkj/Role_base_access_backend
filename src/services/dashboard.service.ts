import Application from '../model/Application';

export const getSummaryStats = async () => {
  const total = await Application.countDocuments({});
  const pending = await Application.countDocuments({ status: 'pending' });
  const verified = await Application.countDocuments({ status: 'verified' });
  const approved = await Application.countDocuments({ status: 'approved' });
  const rejected = await Application.countDocuments({ status: 'rejected' });

  return { total, pending, verified, approved, rejected };
};