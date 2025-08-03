import express from 'express';
import { submitFeedback, getFeedbacks } from '../controllers/feedback.controller';

const router = express.Router();
router.post('/', submitFeedback);
router.get('/', getFeedbacks);

export default router;
