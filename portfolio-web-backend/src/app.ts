import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes';
import feedbackRoutes from './routes/feedback.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

export default app;
