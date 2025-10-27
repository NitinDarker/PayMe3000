import { Router } from "express";
import { signup, signin, update } from "../controllers/user/index.js";
import userAuth from "../middlewares/auth.js";
const userRouter = Router();

userRouter.use("/signup", signup);
userRouter.use("/signin", signin);
userRouter.use("/update", userAuth, update)

export default userRouter;
