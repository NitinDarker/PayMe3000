import { Router } from "express";
import { getBalance, transferMoney, getHistory, deposit } from "../controllers/account/index.js";
import userAuth from "../middlewares/auth.js";

const accountRouter = Router();

accountRouter.get("/balance", userAuth, getBalance);
accountRouter.post("/transfer", userAuth, transferMoney);
accountRouter.get("/history", userAuth, getHistory);
accountRouter.post("/deposit", userAuth, deposit);

export default accountRouter;
