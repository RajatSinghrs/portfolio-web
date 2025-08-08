import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createContact, getContacts } from '../controllers/contact.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();
router.post('/', asyncHandler(createContact));
router.get('/', authenticate, asyncHandler(getContacts));

export default router;
