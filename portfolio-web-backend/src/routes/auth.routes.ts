import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/asyncHandler';
import passport from 'passport';
import { ENV } from '../config/env';
import { googleOAuthCallback } from '../controllers/auth.controller';
import { githubOAuthCallback } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

// Start OAuth flow for google 
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account" }));

// Callback endpoint Google redirects to
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${ENV.FRONTEND_URL}/login` }),
  googleOAuthCallback
);


// Start OAuth flow for google 
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// callback
router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${ENV.FRONTEND_URL}/login` }),
  githubOAuthCallback
);

export default router;