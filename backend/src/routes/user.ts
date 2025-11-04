import { Router } from "express";
import {
  signup,
  signin,
  update,
  bulk,
  myInfo,
} from "../controllers/user/index.js";
import { userAuth } from "../middlewares/index.js";
const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/update", userAuth, update);
userRouter.get("/bulk", userAuth, bulk);
userRouter.get("/me", userAuth, myInfo);

export default userRouter;
