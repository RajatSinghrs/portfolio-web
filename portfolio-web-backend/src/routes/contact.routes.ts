import express from 'express';
import { getContacts, submitContact } from '../controllers/contact.controller';

const router = express.Router();
router.get('/', getContacts);
router.post('/', submitContact);

export default router;
