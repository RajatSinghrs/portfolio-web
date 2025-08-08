import { Request, Response } from 'express';
import { Contact } from '../models/contact.model';

export const createContact = async (req: Request, res: Response) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};
