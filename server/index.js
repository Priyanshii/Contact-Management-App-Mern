import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRoutes from './routes/contacts.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({limit: "10mb"}));

app.use(cors({
  origin: ['http://localhost:3000', 'https://contact-management-app-mern.vercel.app'],
  credentials: true,
}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/contacts', contactsRoutes);
app.use('/auth', userRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, ()=> console.log(`Server is listening on port: ${port}`)))
  .catch((error) => console.log(`${error} did not connect`));
 