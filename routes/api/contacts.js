import express from 'express';
import {addContact, getContactById, listContacts, deleteContact, updateContact} from '../../models/contacts.js';
import contactSchema from '../../validations/contactValidation.js';
import { nanoid } from 'nanoid';

const validateContact = (req, res, next) => {
  const {error} = contactSchema.validate(req.body, {abortEarly: false});
  if (error) {
      return res.status(400).json({
          status: 'error',
          errors: error.details.map(detail => ({
              field: detail.context?.key,
              message: detail.message
          }))
      });
  }
  next();
};

const router = express.Router()

router.get('/', async (req, res, next) => {
  const list = await listContacts();
  console.log(list);
  res.json(list);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId: id } = req.params;
  const contact = await getContactById(id);
  if (!contact) return res.status(400).json({ message: 'Not found'});
  res.json(contact);
})

router.post('/', validateContact, async (req, res, next) => {
  const {name, email, phone} = req.body;
  const newContact = await addContact({ id: nanoid(), name, email, phone });
  res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId: id } = req.params;
  const contact = await getContactById(id);
  if (!contact) return res.status(404).json({"message": "Not found"});
  await deleteContact(id);
  res.json({"message": "contact deleted"});
})

router.put('/:contactId', validateContact, async (req, res, next) => {
  const { contactId: id } = req.params;
  const { name, email, phone } = req.body;

  const contact = await getContactById(id);
  if (!contact) return res.status(404).json({"message": "Not found"});

  const updatedContact = await updateContact({ id, name, email, phone });
  res.json(updatedContact);
})

export default router;