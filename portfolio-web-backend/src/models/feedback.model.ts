import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);
