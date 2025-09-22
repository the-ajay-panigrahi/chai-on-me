import mongoose from "mongoose";

async function dbConnect() {
  // Check if we have a connection to the database
  // mongoose.connection.readyState === 1 means connected
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // If not, create a new connection
  return mongoose.connect(process.env.MONGODB_URI);
}

export default dbConnect;