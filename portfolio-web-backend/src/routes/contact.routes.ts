import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createContact, getContacts } from '../controllers/contact.controller';
import { asyncHandler } from '../utils/asyncHandler';
// import { getContacts, submitContact } from '../controllers/contact.controller';

const router = express.Router();
// router.get('/', getContacts);
// router.post('/', submitContact);

router.post('/', asyncHandler(createContact));
router.get('/', authenticate, asyncHandler(getContacts));

export default router;
