import express from 'express';
import { submitContact } from '../controllers/contact.controller';

const router = express.Router();
router.post('/', submitContact);

export default router;
