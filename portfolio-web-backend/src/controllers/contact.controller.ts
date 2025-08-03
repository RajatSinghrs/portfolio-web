import { Request, Response } from 'express';
import { Contact } from '../models/contact.model';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact' });
  }
};
