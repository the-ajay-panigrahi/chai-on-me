import mongoose from "mongoose";

// This defines the structure for each individual supporter's data
const SupporterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// This defines the main structure for a user's profile
const ProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },  
  username: { type: String, unique: true },  
  profilePicture: { type: String },
  coverPhoto: { type: String },  
  stripeKey: { type: String },  
  stripeSecret: { type: String },  
  supporters: [SupporterSchema], 
});

// This line prevents Mongoose from recompiling the model on every hot-reload
export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
