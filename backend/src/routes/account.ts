import { Router } from "express";
import { getBalance, transferMoney } from "../controllers/account/index.js";
import userAuth from "../middlewares/auth.js";

const accountRouter = Router();

accountRouter.get("/balance", userAuth, getBalance);
accountRouter.post("/transfer", userAuth, transferMoney)

export default accountRouter;
