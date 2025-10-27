import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
  override: false,
  debug: false,
  quiet: true,
  encoding: "utf-8"
});

import express, {
  type ErrorRequestHandler,
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
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).send({
      success: false,
      error: "Sorry! We have encountered and error!\n" + err,
    });
    console.error(err);
  }
);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
