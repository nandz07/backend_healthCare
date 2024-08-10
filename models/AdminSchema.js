import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String },
  role: {
    type: String,
    default: "admin",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
});

export default mongoose.model("Admin", AdminSchema);
