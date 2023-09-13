import express from 'express';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../controllers/contacts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllContacts);
router.get('/:id', auth, getContactById);
router.post('/', auth, createContact);
router.patch('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

export default router;