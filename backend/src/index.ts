import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

import { router } from "./routes/index.js";

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/", router);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
