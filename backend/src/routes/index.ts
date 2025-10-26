import { Router } from "express";
import userRouter from "./user.js";

const router = Router();

router.get("/user", userRouter);

export { router };
