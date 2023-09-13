import express from 'express';
import { googleSignin } from '../controllers/users.js';

const router = express.Router();

router.post('/google', googleSignin);

export default router;