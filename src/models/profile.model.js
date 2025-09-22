import mongoose from "mongoose";

// This defines the structure for each individual supporter's data
const SupporterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// This defines the main structure for a user's profile
const ProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // From GitHub login
  name: { type: String }, // From Dashboard form
  username: { type: String, unique: true }, // From Dashboard form
  profilePicture: { type: String }, // From Dashboard form
  coverPhoto: { type: String }, // From Dashboard form
  stripeKey: { type: String }, // From Dashboard form
  stripeSecret: { type: String }, // From Dashboard form
  supporters: [SupporterSchema], // A list of supporters
});

// This line prevents Mongoose from recompiling the model on every hot-reload
export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
