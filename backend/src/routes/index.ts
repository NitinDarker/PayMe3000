import { Router, type Request, type Response } from "express";
import userRouter from "./user.js";

const router = Router();

router.use("/user", userRouter);

export { router };