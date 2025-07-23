import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (plainText: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashed);
};