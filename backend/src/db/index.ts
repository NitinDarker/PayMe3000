const mongoose = require("mongoose");
import dotenv from "dotenv";

dotenv.config();
const mongo_url = process.env.MONGODB_URI;

mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.log("MongoDB Connection error: ", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    length: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxlength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
