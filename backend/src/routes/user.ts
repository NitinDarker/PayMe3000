import { Router } from "express";
import { signup } from "../controllers/user/index.js";
import signin from "../controllers/user/signin.js";
const userRouter = Router();

userRouter.use("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/signout", () => {});

export default userRouter;
