import { Router } from "express";
import { signup } from "../controllers/user/index.js";
const userRouter = Router();

console.log("✅ User controller file loaded");
userRouter.use("/signup", signup);
userRouter.post("/signin", () => {});
userRouter.post("/signout", () => {});

export default userRouter;
