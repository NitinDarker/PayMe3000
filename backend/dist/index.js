"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongo_url = process.env.MONGODB_URI;
mongoose
    .connect(mongo_url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error occurred: ", err));
//# sourceMappingURL=index.js.map