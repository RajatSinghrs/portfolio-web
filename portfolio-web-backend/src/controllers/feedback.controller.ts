import { Request, Response } from 'express';
import { Feedback } from '../models/feedback.model';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { name, rating, comment } = req.body;
    const feedback = new Feedback({ name, rating, comment });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

export const getFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve feedbacks' });
  }
};
