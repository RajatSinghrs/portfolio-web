import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { ENV } from '../config/env';
import { asyncHandler } from '../utils/asyncHandler';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: '1d' });
  res.status(201).json({ token, user: { name: user.name, email: user.email } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password as any);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: '1d' });
  res.status(200).json({ token, user: { name: user.name, email: user.email } });

};


export const googleOAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    res.status(400);
    throw new Error('Google auth failed: no user returned');
  }

  const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: '1d' });

  // Option A: redirect to frontend route that will read token from fragment
  const redirectUrl = `${ENV.FRONTEND_URL}/oauth2/redirect#token=${token}`;

  // Option B (alternate): set httpOnly cookie (safer) and redirect - for better quality in production
  // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  // const redirectUrl = `${ENV.FRONTEND_URL}/`;

  res.redirect(redirectUrl);
});