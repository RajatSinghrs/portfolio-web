import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200'
};
