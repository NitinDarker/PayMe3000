const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Schema, Model } = mongoose;

dotenv.config();
const mongo_url = process.env.MONGODB_URI;

mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.log("MongoDB Connection error: ", err));

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
})

const userModel = mongoose.model('user', userSchema)

module.exports = {userModel}