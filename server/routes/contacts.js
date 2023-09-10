import express from 'express';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;