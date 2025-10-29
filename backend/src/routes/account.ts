import { Router } from "express";
import { getBalance } from "../controllers/account/index.js";
import userAuth from "../middlewares/auth.js";

const accountRouter = Router();

accountRouter.get("/balance", userAuth, getBalance);

export default accountRouter;
