import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
  override: false,
  debug: false,
  quiet: true,
  encoding: "utf-8"
});

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";

const PORT = process.env.PORT;

import { router } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

// Catch-All Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found",
  });
});

// Error Handling Middleware
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
