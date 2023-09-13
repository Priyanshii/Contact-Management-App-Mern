import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    // required: true, 
    // unique: true,
    // error will appear when we uncomment above lines as you are trying to define required:true and unqiue:true, as _id will already have this in place, that is you cannot have _id to have non-unqiue value even if the condition from mongoose is not there and it is always required. Try dropping these two constraints and just setting the the type:String and this message should disappear.
  },
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
  },
  imgUrl: {
    type: String, 
  },
},{timestamps: true})

export default mongoose.model('User', userSchema);