import express from 'express';
import mongoose from 'mongoose';

import Contact from '../models/Contact.js';

const router = express.Router();

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({ contacts });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getContactById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Please Enter a valid id" });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Please Enter a valid id" });

  try {
    const contactData = await Contact.findById({ _id: id });
    return res.status(200).json({ contactData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createContact = async (req, res) => {
  const contactData = req.body;

  try {
    const response = await Contact.create({ ...contactData });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
}

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const contactData = req.body;

  try {
    const response = await Contact.findByIdAndUpdate(id, contactData, { new: true });
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Contact.findByIdAndRemove(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
