import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    index: true
  },
  phoneNumber: {
    type: String, 
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  postedBy: {
    type: String,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('Contact', contactSchema);