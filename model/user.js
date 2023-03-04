import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, required: false },
  modified_at: { type: Date, required: false },
});

export const User = mongoose.model("User", user);
// name
// email
// mobile
// password
