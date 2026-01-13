import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo_url = process.env.MONGODB_URI as string;

mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.log("MongoDB Connection error: ", err));

const userSchema = new Schema({
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
    min: 1000000000,
    max: 9999999999,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
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

const accountSchema = new Schema({
  balance: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
});

const userModel = model("user", userSchema);
const accountModel = model("account", accountSchema);

export { userModel, accountModel };
