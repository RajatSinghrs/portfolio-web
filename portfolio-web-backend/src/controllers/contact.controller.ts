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

  export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};
