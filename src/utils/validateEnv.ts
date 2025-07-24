export const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
