import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes';
import feedbackRoutes from './routes/feedback.routes';
import authRoutes from './routes/auth.routes';
import { ENV } from './config/env';
import { errorHandler } from './middleware/error.middleware';

const app = express();
dotenv.config();

// app.use(cors());
app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handler
app.use(errorHandler);

export default app;
